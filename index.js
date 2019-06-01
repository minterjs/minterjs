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
}

module.exports = (auth = {}) => {return new MinterJS(auth);};
