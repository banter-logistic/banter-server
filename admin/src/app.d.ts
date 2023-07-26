/// <reference path="../../lib/types.d.ts"/>
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: Pick<Zod.infer<typeof import("lib/schema/database").UserSchema>,'username'|'type'|'subjek'>
		}
		interface PageData {
			auth: Locals['auth']
		}
		// interface Platform {}
	}
}

export {};
