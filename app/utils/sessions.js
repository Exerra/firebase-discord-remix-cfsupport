import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		// a Cookie from `createCookie` or the CookieOptions to create one
		cookie: {
			name: "__session",

			// all of these are optional
			expires: new Date(Date.now() + 604800),
			httpOnly: true,
			maxAge: 604800,
			path: "/",
			sameSite: "lax",
			secrets: ["hbS&hs"],
			secure: process.env.NODE_ENV == "production"
		}
	});

export { getSession, commitSession, destroySession };