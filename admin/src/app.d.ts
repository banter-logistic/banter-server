/// <reference path="../../lib/index.d.ts"/>

declare global {
	namespace App {
		interface Error {
			code: string;
			id?: string;
		}
		interface Locals {
			auth: api.Auth.GetSession.Output,
			session?: api.Auth.GetSession.Output
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};