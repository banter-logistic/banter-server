
export const dateLog: () => void

export const Ok: <T>(data: T) => Result<T>
export const None: <T = any>(msg?: string) => Result<T>
export const Err: <T = any>(msg?: string, name?: string) => Result<T>
export const ServerErr: <T = any>(error: any) => Result<T>

export function safeParseInt(val?: any): Result<number>
export function safeParseInt(val?: any, fallback?: number): number
export function safeParseInt(val?: any, fallback?: number): number | Result<number>