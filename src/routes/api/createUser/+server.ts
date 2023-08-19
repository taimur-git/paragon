import { json } from '@sveltejs/kit';
import { auth } from "$lib/server/lucia";

export const POST = async ({ request, locals }) => {
    const form = await request.json();
    
    const username = form.username;
    const password = form.password;
    const email = form.email;
    if(typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string'){
        return json({ message: 'Invalid request' }, { status: 400 });
    }
    try{
        const user = await auth.createUser({
            primaryKey: {
                providerId: 'username',
                providerUserId: username,
                password
            },
            attributes: {
                username
            }
        });
        const session = await auth.createSession(user.userId);
        locals.auth.setSession(session);

        try{
            await prisma.user.create({
                data: {
                    authid: user.userId,
                    id: user.userId,
                    name: username,
                    email: email,
                    username: username,
                }
                
            })
        } catch (err) { 
            console.error(err);
            return json({ message: 'Cannot create user' }, { status: 500 });
        }

        return json({ message: 'User created' }, { status: 201 });


    }
    catch (err) {
        console.error(err)
        return json({ message: 'Cannot create auth user' }, { status: 500 });
    }
}