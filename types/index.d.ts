
export function parseAssign (data: unknown, options?: Partial<unknown>): unknown
export function isDateString (value: string): boolean
export function emit (value: string): unknown

export default function (query: Partial<unknown>, options?: Partial<unknown>): (data: unknown) => boolean