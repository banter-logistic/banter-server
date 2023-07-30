/// <reference path="../../lib/index.d.ts"/>

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: api.Auth.GetSession.Output
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};