class MinterJS {
    constructor (auth = {}){
        this.host = auth.host || 'http://localhost:8841';
        this.tx = auth.tx || 0.1;
    }
}

module.exports = MinterJS;
