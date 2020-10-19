import { operators, ruleJudgment } from '../src'

describe('\nOperators Tests', () => {

  describe('\n    $lt', () => {
    test('$lt (3, 5) => true', () => {
      let result = operators.$lt(3, 5)
      expect(result).toBe(true)
    })

    test('$lt (3, 3) => false', () => {
      let result = operators.$lt(3, 3)
      expect(result).toBe(false)
    })

    test('$lt (5, 3) => false', () => {
      let result = operators.$lt(5, 3)
      expect(result).toBe(false)
    })
  })

  describe('\n    $lte', () => {
    test('$lte (3, 5) => true', () => {
      let result = operators.$lte(3, 5)
      expect(result).toBe(true)
    })

    test('$lte (3, 3) => true', () => {
      let result = operators.$lte(3, 3)
      expect(result).toBe(true)
    })

    test('$lte (5, 3) => false', () => {
      let result = operators.$lte(5, 3)
      expect(result).toBe(false)
    })
  })

  describe('\n    $gt', () => {
    test('$gt (3, 5) => false', () => {
      let result = operators.$gt(3, 5)
      expect(result).toBe(false)
    })

    test('$gt (3, 3) => false', () => {
      let result = operators.$gt(3, 3)
      expect(result).toBe(false)
    })

    test('$gt (5, 3) => true', () => {
      let result = operators.$gt(5, 3)
      expect(result).toBe(true)
    })
  })

  describe('\n    $gte', () => {
    test('$gte (3, 5) => false', () => {
      let result = operators.$gte(3, 5)
      expect(result).toBe(false)
    })

    test('$gte (3, 3) => true', () => {
      let result = operators.$gte(3, 3)
      expect(result).toBe(true)
    })

    test('$gte (5, 3) => true', () => {
      let result = operators.$gte(5, 3)
      expect(result).toBe(true)
    })
  })

  describe('\n    $eq', () => {
    test('$eq (3, 3) => true', () => {
      let result = operators.$eq(3, 3)
      expect(result).toBe(true)
    })

    test('$eq (\'user\', \'user\') => true', () => {
      let result = operators.$eq('user', 'user')
      expect(result).toBe(true)
    })

    test('$eq (new Date(), new Date()) => true', () => {
      let result = operators.$eq(new Date(), new Date())
      expect(result).toBe(true)
    })

    test('$eq ([1,2,3], [1,2,3]) => true', () => {
      let result = operators.$eq([1,2,3], [1,2,3])
      expect(result).toBe(true)
    })

    test('$eq (null, null) => true', () => {
      let result = operators.$eq(null, null)
      expect(result).toBe(true)
    })

    test('$eq (undefined, undefined) => true', () => {
      let result = operators.$eq(undefined, undefined)
      expect(result).toBe(true)
    })

    test('$eq ({ username: \'user\' }, { username: \'user\' }) => true', () => {
      let result = operators.$eq({ username: 'user' }, { username: 'user' })
      expect(result).toBe(true)
    })
  })

  describe('\n    $ne', () => {
    test('$ne (3, 3) => false', () => {
      let result = operators.$ne(3, 3)
      expect(result).toBe(false)
    })

    test('$ne (\'user\', \'user\') => false', () => {
      let result = operators.$ne('user', 'user')
      expect(result).toBe(false)
    })

    test('$ne (new Date(), new Date()) => false', () => {
      let result = operators.$ne(new Date(), new Date())
      expect(result).toBe(false)
    })

    test('$ne ([1,2,3], [1,2,3]) => false', () => {
      let result = operators.$ne([1,2,3], [1,2,3])
      expect(result).toBe(false)
    })

    test('$ne (null, null) => false', () => {
      let result = operators.$ne(null, null)
      expect(result).toBe(false)
    })

    test('$ne (undefined, undefined) => false', () => {
      let result = operators.$ne(undefined, undefined)
      expect(result).toBe(false)
    })

    test('$ne ({ username: \'user\' }, { username: \'user\' }) => false', () => {
      let result = operators.$ne({ username: 'user' }, { username: 'user' })
      expect(result).toBe(false)
    })
  })

  describe('\n    $regex', () => {
    test('$regex (\'admin888\', /admin/i) => true', () => {
      let result = operators.$regex('admin888', /admin/i)
      expect(result).toBe(true)
    })

    test('$regex (\'admin888\', /^admin/i) => true', () => {
      let result = operators.$regex('admin888', /^admin/i)
      expect(result).toBe(true)
    })

    test('$regex (\'admin888\', /888$/i) => true', () => {
      let result = operators.$regex('admin888', /888$/i)
      expect(result).toBe(true)
    })
  })

  describe('\n    $mod', () => {
    test('$mod (7, [6,1]) => true', () => {
      let result = operators.$mod(7, [6,1])
      expect(result).toBe(true)
    })
  })

  describe('\n    $in', () => {
    test('$in (\'email\', [\'email\', \'mobile\']) => true', () => {
      let result = operators.$in('email', ['email', 'mobile'])
      expect(result).toBe(true)
    })

    test('$in ([\'email\', \'mobile\'], [\'email\']) => true', () => {
      let result = operators.$in(['email', 'mobile'], ['email'])
      expect(result).toBe(true)
    })
  })

  describe('\n    $nin', () => {
    test('$nin (\'github\', [\'email\', \'mobile\']) => true', () => {
      let result = operators.$nin('github', ['email', 'mobile'])
      expect(result).toBe(true)
    })

    test('$nin ([\'github\', \'mobile\'], [\'email\']) => true', () => {
      let result = operators.$nin(['github', 'mobile'], ['email'])
      expect(result).toBe(true)
    })
  })

  describe('\n    $_in', () => {
    test('$_in ([\'email\', \'mobile\'], \'email\') => true', () => {
      let result = operators.$_in(['email', 'mobile'], 'email')
      expect(result).toBe(true)
    })

    test('$_in ([\'email\', \'mobile\'], [\'email\', \'mobile\', \'other\']) => true', () => {
      let result = operators.$_in(['email', 'mobile'], ['email', 'mobile', 'other'])
      expect(result).toBe(true)
    })
  })

  describe('\n    $_nin', () => {
    test('$_nin ([\'email\', \'mobile\'], \'github\') => true', () => {
      let result = operators.$_nin(['email', 'mobile'], 'github')
      expect(result).toBe(true)
    })

    test('$_nin ([\'email\', \'mobile\'], [\'email\', \'mobile\', \'other\']) => false', () => {
      let result = operators.$_nin(['email', 'mobile'], ['email', 'mobile', 'other'])
      expect(result).toBe(false)
    })
  })

  describe('\n    $size', () => {
    test('$size ([\'email\', \'mobile\'], { $lt: 2 }) => false', () => {
      let result = operators.$size(['email', 'mobile'], { $lt: 2 })
      expect(result).toBe(false)
    })
    test('$size ([\'email\', \'mobile\'], { $lte: 2 }) => true', () => {
      let result = operators.$size(['email', 'mobile'], { $lte: 2 })
      expect(result).toBe(true)
    })
    test('$size ([\'email\', \'mobile\'], { $lt: 3, $gte: 2 }) => true', () => {
      let result = operators.$size(['email', 'mobile'], { $lt: 3, $gte: 2 })
      expect(result).toBe(true)
    })
    test('$size ([\'email\', \'mobile\'], { $and: [{ $lt: 3 }, { $gte: 2 }] }) => true', () => {
      let result = operators.$size(['email', 'mobile'], { $and: [{ $lt: 3 }, { $gte: 2 }] })
      expect(result).toBe(true)
    })
    test('$size ([\'email\', \'mobile\'], { $or: [{ $lt: 2 }, { $gte: 2 }] }) => true', () => {
      let result = operators.$size(['email', 'mobile'], { $or: [{ $lt: 2 }, { $gte: 2 }] })
      expect(result).toBe(true)
    })
    test('$size ([\'email\', \'mobile\'], { $mod: [2, 0] }) => true', () => {
      let result = operators.$size(['email', 'mobile'], { $mod: [2, 0] })
      expect(result).toBe(true)
    })
  })
  
})

describe('\nruleJudgment Tests\n', () => {
  const data = {
    username: 'thondery',
    email: 'thondery@163.com',
    binds: ['email', 'mobile', 'github']
  }

  test('find: { username: \'thondery\' }', () => {
    let result = ruleJudgment(data, { username: 'thondery' })
    expect(result).toBe(true)
  })

  test('find: { username: { $regex: /thondery/i } }', () => {
    let result = ruleJudgment(data, { username: { $regex: /thondery/i } })
    expect(result).toBe(true)
  })

  test('find: { username: \'thondery\', email: \'thondery@163.com\' }', () => {
    let result = ruleJudgment(data, { username: 'thondery', email: 'thondery@163.com' })
    expect(result).toBe(true)
  })

  test('find: { $or: [ { username: \'thondery\' }, { email: \'thondery@163.com\'} ] }', () => {
    let result = ruleJudgment(data, { $or: [ { username: 'thondery' }, { email: 'thondery@163.com'} ] })
    expect(result).toBe(true)
  })

  test('find: { $or: [ { username: \'thondery\' }, { email: \'thondery@163.com\'} ] }', () => {
    let result = ruleJudgment(data, { $or: [ { username: 'thondery' }, { email: 'thondery@163.com'} ] })
    expect(result).toBe(true)
  })

  test('find: { username: { $in: [\'thondery\', \'admin\'] } }', () => {
    let result = ruleJudgment(data, { username: { $in: ['thondery', 'admin'] } })
    expect(result).toBe(true)
  })
})