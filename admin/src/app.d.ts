import type { SessionSchema } from "lib/const";
import type { Pooling } from "./hooks.server";

declare global {
	namespace App {
		interface Error {
			code: string,
			[x: string]: any
		}
		interface Locals {
			user: Zod.infer<typeof SessionSchema>,
			pool: Pooling
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
