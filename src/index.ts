
import { isEqual, isString, isDate, isArray, intersection, Dictionary, toPairs, isPlainObject, isEmpty, isUndefined } from 'lodash'

const __BigInt = BigInt || Number

/**
 * 操作符
 */
export const operators = {
  /**
   * 小于
   */
  $lt: (a: number | bigint | Date, b: number | bigint | Date) => toValue(a) < toValue(b),
  /**
   * 小于等于
   */
  $lte: (a: number | bigint | Date, b: number | bigint | Date) => toValue(a) <= toValue(b),
  /**
   * 大于
   */
  $gt: (a: number | bigint | Date, b: number | bigint | Date) => toValue(a) > toValue(b),
  /**
   * 大于等于
   */
  $gte: (a: number | bigint | Date, b: number | bigint | Date) => toValue(a) >= toValue(b),
  /**
   * 等于
   */
  $eq: (a: any, b: any) => isEqual(toValue(a), toValue(b)),
  /**
   * 不等于
   */
  $ne: (a: any, b: any) => !isEqual(toValue(a), toValue(b)),
  /**
   * 正则匹配
   */
  $regex: (a: string, reg: RegExp) => reg.test(a),
  /**
   * 取模运算
   */
  $mod: (a: number | bigint, mod: number[]) => {
    let [ x, y ] = mod
    return __BigInt(a) % __BigInt(x || 0) === __BigInt(y || 0)
  },
  /**
   * 包含
   */
  $in: (a: any, b: any[]): boolean => {
    if (isArray(a)) {
      return intersection(toValue(a), toValue(b)).length > 0
    }
    return toValue(b).includes(toValue(a))
  },
  /**
   * 不包含
   */
  $nin: (a: any, b: any[]): boolean => {
    if (isArray(a)) {
      return intersection(toValue(a), toValue(b)).length === 0
    }
    return !toValue(b).includes(toValue(a))
  },
  /**
   * 反包含
   */
  $_in: (a: any[], b: any): boolean => {
    if (isArray(b)) {
      return intersection(toValue(a), toValue(b)).length > 0
    }
    return toValue(a).includes(toValue(b))
  },
  /**
   * 反不包含
   */
  $_nin: (a: any[], b: any): boolean => {
    if (isArray(b)) {
      return intersection(toValue(a), toValue(b)).length === 0
    }
    return !toValue(a).includes(toValue(b))
  },
  /**
   * 数组长度
   */
  $size: (a: any[], query: Dictionary<any>) => calculation(a.length, query),
  /**
   * 判断字段是否存在
   */
  $exists: (a: any, exists: boolean) => isUndefined(a) != exists,
  /**
   * Or 连接
   */
  $or: (...__result: boolean[]) => evil(__result.map(String).join(' || ')),
  /**
   * And 连接
   */
  $and: (...__result: boolean[]) => evil(__result.map(String).join(' && '))
}

/**
 * 判断 DateString
 * @param value 
 */
export function isDateString (value: string): boolean {
  let date = new Date(value)
  return String(date) === 'Invalid Date' ? false : true
}

/**
 * 转换数值
 * @param value 
 */
function toValue (value: any): any {
  let val = value
  if (typeof value === 'number') {
    val = __BigInt(value)
  }
  else if (isString(value) && isDateString(value)) {
    val = new Date(value).getTime()
  }
  else if (isDate(value)) {
    val = value.getTime()
  }
  else if (isArray(value)) {
    val = value.map(toValue)
  }
  return val
}

/**
 * 运算操作
 * @param data 
 * @param query 
 */
function calculation (data: any, query: Dictionary<any>): boolean {
  let __result: boolean[] = []
  for (let pairs of toPairs(query)) {
    let [ operator, value ] = pairs
    if (['$and', '$or'].includes(operator)) {
      __result.push(calculationJoin(data, value, operator as '$and' | '$or'))
    }
    else if (/^\$/.test(operator)) {
      __result.push(operators[operator](data, value))
    }
    else if (isPlainObject(value)) {
      if (/^\$/.test(operator)) {
        __result.push(calculation(data, value))
      }
      else {
        __result.push(calculation(data[operator], value))
      }
      
    }
    else {
      __result.push(operators.$eq(data[operator], value))
    }
  }
  return operators.$and(...__result)
}

/**
 * 运算操作连接
 * @param data 
 * @param query 
 * @param mode 
 */
function calculationJoin (data: any, query: Array<Dictionary<any>>, mode: '$and' | '$or' = '$and'): boolean {
  let __result: boolean[] = []
  for (let item of query) {
    for (let key in item) {
      __result.push(calculation(isPlainObject(data) ? data : data, item))
    }
  }
  return operators[mode](...__result)
}

export function ruleJudgment (data: any, query: Dictionary<any>): boolean {
  if (isEmpty(query)) return true
  let __result: boolean[] = []
  for (let key in query) {
    if (['$and', '$or'].includes(key)) {
      __result.push(calculationJoin(data, query[key], key as '$and' | '$or'))
    }
    else {
      __result.push(calculation(data, isPlainObject(query[key]) && !isOperator(query[key]) ? query[key] : query))
    }
  }
  return operators.$and(...__result)
}

function isOperator (query: Dictionary<any>): boolean {
  for (let key of Object.keys(query)) {
    if (/^\$/.test(key)) {
      return true
    }
  }
  return false
}

function evil (value: string): any {
  let fn = Function;
  return new fn('return ' + value)()
}
