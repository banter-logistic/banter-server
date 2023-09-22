// See https://kit.svelte.dev/docs/types#app

import type { User } from '$lib/auth';

// for information about these interfaces
declare global {
	// interface Error {}
	namespace App {
		
		 interface Locals {
    pb: import('pocketbase').default;
    // user: import('pocketbase').default['authStore']['model'];
		user: User
  }
		interface PageData {
			auth: User
		}
		// interface Platform {}
	}
}

export {};
