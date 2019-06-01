/**
 DONE:
    /address?address=_&height=_
    /coin_info?symbol=_&height=_
    /block?height=_
*/

/** TODO:
 /addresses?addresses=_&height=_ issue: https://github.com/MinterTeam/minter-explorer-api/issues/56
 /candidate?pub_key=_&height=_
 /candidates?height=_&include_stakes=_
 /estimate_coin_buy?coin_to_sell=_&coin_to_buy=_&value_to_buy=_&height=_
 /estimate_coin_sell?coin_to_sell=_&coin_to_buy=_&value_to_sell=_&height=_
 /estimate_coin_sell_all?coin_to_sell=_&coin_to_buy=_&value_to_sell=_&gas_price=_&height=_
 /estimate_tx_commission?tx=_&height=_
 /events?height=_
 /max_gas?height=_
 /missed_blocks?pub_key=_&height=_
 /send_transaction?tx=_
 /transaction?hash=_
 /transactions?query=_
 /unconfirmed_txs?limit=_
 /validators?height=_*/

const axios = require('axios');
const log = require('./libs/log');

class MinterJS {
    constructor(auth = {}) {
        this.host = auth.host || 'http://localhost:8841';
        this.fee = auth.fee || 0.1;
        this.privateKey = auth.privateKey;
        this.tx = require('minterjs-tx');
        this.sdk = require('minter-js-sdk');
    }

    async get({path, data}){
        const url = `${this.host}/${path}?${require('querystring').encode(data)}`;
        let result = await axios.get(url).catch(err => log(err.message));

        return result && result.data || {};
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
        const {result} = await this.get({path: 'coin_info', data: {symbol, height}}).catch(e => e);
        return result || null;
    }

    async block({height}){
        const {result} = await this.get({path: 'block', data: {height}}).catch(e => e);
        return result || null;
    }

}

module.exports = (auth = {}) => {return new MinterJS(auth);};
