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


import { auth } from "$lib/server/lucia";
import type { Actions, PageServerLoad } from "./$types";
import { redirect, fail } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const name = form.get("name");
    const email = form.get("email");
    const bio = form.get("bio");
    const phone = form.get("phone");
    const profilePhotoFile = form.get("photo");

    if (typeof name !== "string" || typeof email !== "string" || typeof bio !== "string" || typeof phone !== "string") {
      return fail(400, { message: "Invalid Inputs" });
    }

    const authUser = await locals.auth.validateUser();
    if (!authUser.user) return redirect(302, "/login");
    const id = authUser.user.userId;

    try {
      let updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          email: email,
          bio: bio,
          phone: phone
        },
        include: {
          location: true,
          institute: true,
          credentials: true,
          ads: true
        },
      });

      if (profilePhotoFile) {
        const formData = new FormData();
        formData.append("profilePhoto", profilePhotoFile);

        const response = await fetch("/uploadProfilePhoto", {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();

        // Assuming responseData contains the updated user's photo URL
        updatedUser = {
          ...updatedUser,
          image: responseData.photoUrl,
        };
      }

      return {
        body: {
          message: "Profile Updated Successfully",
          user: updatedUser,
        },
      };
    } catch (e) {
      return fail(400, { message: "Invalid Inputs" });
    }
  },
};

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
  };
};
