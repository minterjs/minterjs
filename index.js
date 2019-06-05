const axios = require('axios');
// const log = require('./libs/log');
const {Minter, DelegateTxParams/*, SellAllTxParams*/} = require('minter-js-sdk');
const qs = require('querystring');

class MinterJS {
    constructor(auth = {}) {
        this.host = auth.host || 'http://localhost:8841';
        this.explorer_api = auth.explorer_api || 'https://explorer-api.minter.network/api/v1';
        this.address = auth.address || 'Mx7926f1944b8faabb3b440b394543ae6f5b2f8f37';
        this.fee = auth.fee || 0.1;
        this.privateKey = auth.privateKey;
        this.node = new Minter({apiType: 'node', baseURL: this.host});
    }

    async get({path, data}){
        const url = `${this.host}/${path}?${require('querystring').encode(data)}`;
        let result = await axios.get(url);

        return result && result.data || {};
    }

    async delegations({address, coinToBuy}) {
        address = address || this.address;
        const path = `${this.explorer_api}/addresses/${address}/delegations`;
        const {data} = await axios.get(path);
        const results = data && data.data || {};
        results.totals = {};
        results.filter(e => e.coin).map(e => {
            const value = parseFloat(e.value);
            results.totals[e.coin] && (results.totals[e.coin].value += value) || (results.totals[e.coin] = {value});
        });
        if (coinToBuy) {
            for (let key in results.totals) {
                const total = results.totals[key];
                const coinToSell = key;
                const estimate = {};
                estimate[coinToBuy] = await this.estimateCoinSell({coinToBuy, coinToSell, valueToSell: total.value});
                results.totals[key] = {...total, ...estimate, coin: coinToSell};
            }
            results.converted = Object.values(results.totals)
                .reduce((a, b) => ((typeof a == 'object') && a[coinToBuy] || a) + parseFloat(b[coinToBuy]));
        }
        return results;
    }

    async estimateCoinSell({coinToBuy, valueToSell, coinToSell}) {
        if (coinToBuy == coinToSell) {
            return valueToSell;
        }
        coinToBuy = coinToBuy || 'BIP';
        valueToSell = Math.floor(valueToSell * 10000) / 10000;
        const par = {coinToSell, coinToBuy: coinToBuy || 'BIP', valueToSell};
        const estimate = await this.node.estimateCoinSell(par);
        return estimate.will_get * (valueToSell - estimate.commission) / valueToSell;
    }

    async transactions(query = {}) {
        const address = query.address || this.address;
        const querystring = query && `?${qs.stringify(query)}` || '';
        const path = `${this.explorer_api}/addresses/${address}/transactions${querystring}`;
        const {data} = await axios.get(path) || {};
        return data && data.data || {};
    }

    async balances({address}) {
        address = address || this.address;
        const path = `${this.explorer_api}/addresses/${address}`;
        const {data} = await axios.get(path) || {};
        return data && data.data && data.data.balances || {};
    }

    async delegate({publicKey, coinSymbol, stake, feeCoinSymbol, message}) {
        coinSymbol = coinSymbol || 'BIP';
        feeCoinSymbol = feeCoinSymbol || coinSymbol;
        publicKey = publicKey || 'Mp629b5528f09d1c74a83d18414f2e4263e14850c47a3fac3f855f200111111111';
        message = message || 'https://github.com/minterjs/minterjs';
        const txParams = new DelegateTxParams({
            privateKey: this.privateKey,
            chainId: 1,
            publicKey,
            coinSymbol,
            stake,
            feeCoinSymbol,
            message,
        });
        return this.node.postTx(txParams);
    }

    async peers(){
        const {result} = await this.get({path: 'net_info'});
        return result && result.peers || [];
    }

    async address({address, height}){
        const {result} = await this.get({path: 'address', data: {address, height}});
        return result || null;
    }

    async coin_info({symbol, height}){
        const {result} = await this.get({path: 'coin_info', data: {symbol, height}});
        return result;
    }

    async block({height}){
        const {result} = await this.get({path: 'block', data: {height}});
        return result;
    }

}

module.exports = (auth = {}) => {return new MinterJS(auth);};
