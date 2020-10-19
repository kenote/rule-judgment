import { Dictionary } from 'lodash'

interface Operators {
  /**
   * 小于
   */
  $lt   : (a: number | bigint | Date, b: number | bigint | Date) => boolean
  /**
   * 小于等于
   */
  $lte  : (a: number | bigint | Date, b: number | bigint | Date) => boolean
  /**
   * 大于
   */
  $gt   : (a: number | bigint | Date, b: number | bigint | Date) => boolean
  /**
   * 大于等于
   */
  $gte  : (a: number | bigint | Date, b: number | bigint | Date) => boolean
  /**
   * 等于
   */
  $eq: (a: any, b: any) => boolean
  /**
   * 不等于
   */
  $ne: (a: any, b: any) => boolean
  /**
   * 正则匹配
   */
  $regex: (a: string, reg: RegExp) => boolean
  /**
   * 取模运算
   */
  $mod: (a: number | bigint, mod: number[]) => boolean
  /**
   * 包含
   */
  $in: (a: any, b: any[]) => boolean
  /**
   * 不包含
   */
  $nin: (a: any, b: any[]) => boolean
  /**
   * 反包含
   */
  $_in: (a: any[], b: any) => boolean
  /**
   * 反不包含
   */
  $_nin: (a: any[], b: any) => boolean
  /**
   * 数组长度
   */
  $size: (a: any[], query: Dictionary<any>) => boolean
  /**
   * 判断字段是否存在
   */
  $exists: (a: any, exists: boolean) => boolean
  /**
   * Or 连接
   */
  $or: (...__result: boolean[]) => boolean
  /**
   * And 连接
   */
  $and: (...__result: boolean[]) => boolean
}

export const operators: Operators

export function ruleJudgment (data: any, query: Dictionary<any>): boolean