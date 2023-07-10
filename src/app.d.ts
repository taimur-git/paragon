// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia-auth').AuthRequest
		}
		// interface PageData {}
		// interface Platform {}
	}
	var prisma: PrismaClient

	//<reference types= 'lucia-auth'/>
	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth
		type UserAttributes = {
			username: string
			name: string
			email: string
			
		}
	}
}
export {};
