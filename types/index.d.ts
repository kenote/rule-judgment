
export function parseAssign (data: any, options?: Partial<any>): any
export function isDateString (value: string): boolean
export function emit (value: string): any

export declare type FilterQuery<T> = {
  [P in keyof T]?: T[P] | QuerySelector<T[P]>
} & {
  $where   ?: (item: T) => boolean
  $and     ?: Array<FilterQuery<T>>
  $or      ?: Array<FilterQuery<T>>
  $nor     ?: Array<FilterQuery<T>>
}

export type QuerySelector<T> = {
  // 
  $lt      ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $lte     ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $gt      ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $gte     ?: T extends (number | bigint | Date) ? number | bigint | Date : never
  $eq      ?: T
  $ne      ?: T
  $regex   ?: T extends string ? RegExp | string : never
  $mod     ?: T extends (number | bigint) ? T[] : never
  $in      ?: T[]
  $nin     ?: T[]
  $_in     ?: T | T[]
  $_nin    ?: T | T[]
  $size    ?: T extends ReadonlyArray<infer U> ? number | QuerySelector<number> : never
  $exists  ?: boolean
  $type    ?: BSONTypeAlias
  $not     ?: T extends string ? QuerySelector<T> | RegExp | string : QuerySelector<T>
  $where   ?: (item: T) => boolean
  $and     ?: Array<QuerySelector<T>>
  $or      ?: Array<QuerySelector<T>>
  $nor     ?: Array<QuerySelector<T>>
}

export type BSONTypeAlias =
  | 'number'
  | 'double'
  | 'string'
  | 'object'
  | 'array'
  | 'binData'
  | 'undefined'
  | 'objectId'
  | 'bool'
  | 'date'
  | 'null'
  | 'regex'
  | 'dbPointer'
  | 'javascript'
  | 'symbol'
  | 'javascriptWithScope'
  | 'int'
  | 'timestamp'
  | 'long'
  | 'decimal'
  | 'minKey'
  | 'maxKey'

export default function<T = any> (query: T extends object ? FilterQuery<T> : QuerySelector<T>, options?: Partial<any>): (data: any) => boolean