# minterjs

Development in progress.

## Install

```bash
npm i minterjs
```

## Done

```js
const MinterJS = require('minterjs')({});

/** /address?address=_&height=_ */
MinterJS.address({address: 'Mx41b2cfc557dc4661a9526a5a3efcd2cc984339d1'});

/** /coin_info?symbol=_&height=_ */
MinterJS.coin_info({symbol: 'KARMA'});

/** /block?height=_ */
MinterJS.block({height: 1});

/** Peers from net_info */
MinterJS.peers();

```

## Contacts

- E-mail: minterjs@vvm.space
- Telegram: @minterjs (https://t.me/minterjs http://teleg.run/minterjs)
- Skype: @vvmspace

## Intersections

- Issue for arrays in GET queries: https://github.com/MinterTeam/minter-explorer-api/issues/56

## Donations

KARMA/BIP: Mx41b2cfc557dc4661a9526a5a3efcd2cc984339d1
