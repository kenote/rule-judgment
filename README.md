# rule-judgment

A query statement similar to mongodb, judge and retrieve data.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Gratipay][licensed-image]][licensed-url]

## Installation

```bash
$ npm install rule-judgment
#
$ yarn add rule-judgment
```

## Usages

```ts
import { operators, ruleJudgment } = 'rule-judgment'

console.log( '3 < 5 =', operators.$lt(3, 5) )
// 3 < 5 = true

console.log( '3 <= 5 =', operators.$lte(3, 5) )
// 3 <= 5 = true

console.log( '3 > 5 =', operators.$gt(3, 5) )
// 3 > 5 = false

console.log( '3 >= 5 =', operators.$gte(3, 5) )
// 3 >= 5 = false

console.log( '3 === 3 =', operators.$eq(3, 3) )
// 3 === 3 = true

console.log( 'test === test =', operators.$eq('test', 'test') )
// test === test = true

console.log( '[] === [] =', operators.$eq([], []) )
// [] === [] = true

console.log( '{} === {} =', operators.$eq({}, {}) )
// {} === {} = true

console.log( '3 != 3 =', operators.$ne(3, 3) )
// 3 != 3 = false

console.log( 'test != test =', operators.$ne('test', 'test') )
// test != test = false

console.log( '[] != [] =', operators.$ne([], []) )
// [] != [] = false

console.log( '{} != {} =', operators.$ne({}, {}) )
// {} != {} = false

console.log( '/test/i.test(\'test\') =', operators.$regex('test', /test/i) )
// /test/i.test('test') = true

console.log( '7 % 6 === 1 =', operators.$mod(7, [6, 1]) )
// 7 % 6 === 1 = true

console.log( '[\'email\', \'mobile\'].includes(\'email\') =', operators.$in('email', ['email', 'mobile']) )
// ['email', 'mobile'].includes('email') = true

console.log( '![\'github\', \'mobile\'].includes(\'email\') =', operators.$nin('github', ['email', 'mobile']) )
// !['email', 'mobile'].includes('github') = true

console.log( '[\'email\', \'mobile\'].includes(\'email\') =', operators.$_in(['email', 'mobile'], 'email') )
// ['email', 'mobile'].includes('email') = true

console.log( '![\'email\', \'mobile\'].includes(\'github\') =', operators.$_nin(['email', 'mobile'], 'github') )
// !['email', 'mobile'].includes('github') = true

console.log( '[\'email\', \'mobile\'].length === 2 =', operators.$size(['email', 'mobile'], { $eq: 2 }) )
// ['email', 'mobile'].length === 2 = true

const data = {
  username: 'thondery',
  email: 'thondery@163.com',
  binds: [ 'email', 'mobile', 'github'],
  min: 3,
  max: 5
}

let result = ruleJudgment(data, {
  $or: [
    { username: { $regex: /thondery/i } },
    { email: 'thondery@163.com' },
    { binds: { $_in: 'github' } },
    { username: { $in: ['admin', 'thondery'] } },
    { binds: { 
      $size: { 
        $and: [
      	  { $lt: 5 },
          { $gt: 2 },
          { $mod: [ 2, 1 ] }
        ]
      }
    }}
  ]
})

console.log(result)
// true
```

## Features

- $lt
- $lte
- $gt
- $gte
- $eq
- $ne
- $regex
- $mod
- $in
- $nin
- $_in
- $_nin
- $size
- $exists
- $and
- $or

## License

this repo is released under the [MIT License](https://github.com/kenote/rule-judgment/blob/master/LICENSE).

[npm-image]: https://img.shields.io/npm/v/rule-judgment.svg
[npm-url]: https://www.npmjs.com/package/rule-judgment
[downloads-image]: https://img.shields.io/npm/dm/rule-judgment.svg
[downloads-url]: https://www.npmjs.com/package/rule-judgment
[travis-image]: https://travis-ci.com/kenote/rule-judgment.svg?branch=main
[travis-url]: https://travis-ci.com/kenote/rule-judgment
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/kenote/rule-judgment/blob/master/LICENSE