class MinterJS {
    constructor (auth = {}){
        this.host = auth.host || 'http://localhost:8841';
    }
}

module.exports = MinterJS;
