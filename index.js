/**
 DONE:
    /address?address=_&height=_
*/

/** TODO:
 /addresses?addresses=_&height=_
 /block?height=_
 /candidate?pub_key=_&height=_
 /candidates?height=_&include_stakes=_
 /coin_info?symbol=_&height=_
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
        this.tx = auth.tx || 0.1;
    }

    async get({path, data}){
        const url = `${this.host}/${path}`;
        let result = await axios.get(url, data).catch(err => log(err => log(e.message)));
        return result && result.data || null;
    }

    async peers(){
        const {result} = await this.get({path: 'net_info'});
        return result && result.peers || [];
    }

    async address({address, height}){
        const {result} = await this.get({path: 'address', data: {address, height}});
        return result || null;
    }

}

module.exports = (auth = {}) => {return new MinterJS(auth);};
