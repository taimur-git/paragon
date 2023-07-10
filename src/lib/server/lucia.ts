
import lucia from 'lucia-auth'
import prismaAdapter from '@lucia-auth/adapter-prisma'
import { sveltekit } from 'lucia-auth/middleware'
import { dev } from '$app/environment'
import { prisma } from '$lib/server/prisma'

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			//name: userData.name
		}
	}
})

export type Auth = typeof auth


//  Type 'PrismaClient<PrismaClientOptions, never, RejectOnNotFound | RejectPerOperation | undefined>'
// is missing the following properties from type '{ authUser: { findUnique: (options: { where: Partial<Readonly<{ id: string; } & Required<UserAttributes>>>; include?: any; }) => Promise<any>; } & { ...; }; authSession: { ...; } & { ...; }; authKey: { ...; } & { ...; }; }': authUser, authSession, authKeyts(2345)
