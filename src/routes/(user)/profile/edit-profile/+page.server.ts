// import type { PageServerLoad } from "./$types";

// import { auth } from "$lib/server/lucia";
// import { redirect } from "@sveltejs/kit";

// export const load: PageServerLoad = async ({ locals }) => {
// 	const auth = await locals.auth.validateUser();
// 	if (!auth.user) throw redirect(302, "/login");

// 	const id = auth.user.userId;

// 	const user = await prisma.user.findUnique({
// 		where: {
// 			id: id,
// 		},
// 		include: {
// 			location: true,
// 			institute: true,
// 			credentials: true,
// 			ads: true,
// 		}
// 	});

// 	return {
// 		user,
// 	};
// };


// Part-2
// import { fail, redirect } from "@sveltejs/kit";
// import { auth } from "$lib/server/lucia";
// import type { Actions, PageServerLoad } from "./$types";
                    
// export const actions: Actions = {
// 	default: async ({ request, locals }) => {
// 	  const form = await request.formData();
// 	  const name = form.get("name");
// 	  const email = form.get("email");
// 	  const bio = form.get("bio");
// 	  const phone = form.get("phone");
// 		// const uni = form.get('uni')
// 		// const location = form.get('location')
// 		if (typeof name !== 'string' || typeof email !== 'string' || typeof bio !== 'string' || typeof phone !== 'string') {
// 			return fail(400, {message: "Invalid Inputs"});
// 		}
// 		const user = await locals.auth.validateUser();
// 		if (!user.user) return redirect(302, "/login");
// 		const id = user.user.userId;
// 		try {
// 			const updatedUser = await prisma.user.update({
// 				where: {
// 					id: id,
// 				},
// 				data: {
// 					name: name,
// 					email: email,
// 					bio: bio,
// 					phone: phone,
// 					// institute: {
// 					// 	connect: {
// 					// 		id: institute
// 					// 	}
// 					// }
// 				},
// 				include: {
// 					location: true,
// 					institute: true,
// 					credentials: true,
// 					ads: true,
// 				}
// 			});
// 			return {
// 				body: {
// 					message: 'Profile Updated Successfully',
// 					user: updatedUser
// 				},
// 			};
// 		}
// 		catch (e) {
// 			return fail(400, { message: "Invalid Inputs" });
// 		}
// 	}
// };

//-----------------------------------------------------------------------------//


import { goto } from "$app/navigation";
import { auth } from "$lib/server/lucia";
import type { Actions, PageServerLoad } from "./$types";
import { redirect, fail } from "@sveltejs/kit";
import mapboxgl from 'mapbox-gl';




export const load: PageServerLoad = async ({ locals }) => {
  const authUser = await locals.auth.validateUser();
  if (!authUser.user) throw redirect(302, "/login");

  const id = authUser.user.userId;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      location: true,
      institute: true,
      credentials: true,
      ads: true,
    },
  });

  return {
    user,
    id
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    
    const id = form.get("userid");
    const username = form.get("username");
    const bio = form.get("bio");
    const email = form.get("email");
    const phone = form.get("phone");
    const location = form.get("location");
        
      try{
          await prisma.user.update({
              data: {
                  username: username,
                  name: username,
                  email: email,
                  bio: bio,
                  phone: phone,
              location: {
                connect: {
                  id: location
                }
                }
              },
              where: {
                  id: id,
              },
              include: {
                  location: true,
                  institute: true,
                  credentials: true,
                  ads: true,
              }
          })
          await prisma.authUser.update({
              data: {
                  username: username,
              },
              where: {
                  id: id,
              }
          })

        goto("../../profile") //Idk why this doesn't work

        
        
          
      } catch (err) { 
          console.error(err);
      }
  }
}