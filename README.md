# minterjs

Development in progress. Welcome to contribute!

NPM: https://www.npmjs.com/package/minterjs

## Install

```bash
npm i minterjs
```

## Automatic delegation usage example

```javascript
(async () => {
    const moment = require('moment');
    const {privateKey, address, publicKey, nodeHost} = process.env;
    const MinterJS = require('minterjs')({privateKey, host: nodeHost || 'http://minter.digriz.tech:8841'});
    const BIP = parseFloat((await MinterJS.balances({address})).find(balance => balance.coin == 'BIP').amount || '0');
    const min = 24 - parseInt(moment().format('H'));
    if(BIP > min){
        await MinterJS.delegate({stake: BIP - 0.7, publicKey});
    }
})();
```

### Run in cron:

```bash
privateKey=BLA_BLA_BLA address=YOUR_ADDRESS_FOR_MONITORING publicKey=PUBLIC_KEY_OF_FAVORITE_NODE nodeHost=http://minter.digriz.tech:8841 node /redelegate/index.js
```

## Done

```js
const MinterJS = require('minterjs')({host, privateKey});

/** /address?address=_&height=_ */
MinterJS.address({address: 'Mx41b2cfc557dc4661a9526a5a3efcd2cc984339d1'});

/** /coin_info?symbol=_&height=_ */
MinterJS.coin_info({symbol: 'KARMA'});

/** /block?height=_ */
MinterJS.block({height: 1});

/** Peers from net_info */
MinterJS.peers();

/** Balances on address */
MinterJS.balances({address});

/** Delegate */
MinterJS.delegate({coinSymbol /** = BIP */, feeCoinSymbol /** = BIP */, stake, publicKey  /** default: minter.store */});

/** Delegations */ 
MinterJS.delegations({address /** optional */});

/** Transactions */
MinterJS.transactions({address /** optional */, startblock /** optional */, endblock /** optional */, page /** optional */});
```

## Contacts

- E-mail: minterjs@vvm.space
- Telegram: @minterjs (https://t.me/minterjs http://teleg.run/minterjs)
- Skype: @vvmspace

## Donations

Mx41b2cfc557dc4661a9526a5a3efcd2cc984339d1

Or better:

## Minter node:

We launched node, please delegate:

Mp3df654b34c167443ef52e8644266866813b92d4a6ff9c0245c259750a199a455 (3% only)

### Use node:

http://minter.digriz.tech:8841
