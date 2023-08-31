import type { SessionSchema } from "lib/const";
import type { Pooling } from "lib/util/pooling";
import type { SuperValidated } from "sveltekit-superforms";
import type { AnyZodObject, z } from "zod";

declare global {
	namespace App {
		interface Error {
			code: string,
			[x: string]: any
		}
		interface Locals {
			user: Zod.infer<typeof SessionSchema>,
			pool: Pooling,
			formData: <T extends AnyZodObject>(z: T) => Promise<z.infer<T>>,
			superForm: <T extends Zod.AnyZodObject>(zod: T) => Promise<SuperValidated<T>>
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
