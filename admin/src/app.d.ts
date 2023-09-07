import type { Pooling } from "lib/db"
import type { SessionSchema } from "lib/const";
import type { User } from "lib/schema/user";


declare global {
	namespace App {
		interface Error {
			code: string,
			[x: string]: any
		}
		interface Locals {
			user: User,
			pool: Pooling,
			formData: <T extends Zod.AnyZodObject>(z: T) => Promise<z.infer<T>>,
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
