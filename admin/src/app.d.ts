import type { SessionSchema } from "lib/const";

declare global {
	namespace App {
		interface Error {
			code: string,
			msg: string
		}
		interface Locals {
			user: Zod.infer<typeof SessionSchema>
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
