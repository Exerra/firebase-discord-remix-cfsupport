import {redirect, useLoaderData} from "remix";
import { config } from "~/info.js"
import {deleteDocument, getCollection, getUserFromDB, writeToken} from "~/utils/db.server";
import {commitSession, destroySession, getSession} from "~/utils/sessions";
import { getUser, getToken, getGuilds } from "~/utils/discord";

export let loader = async ({ request }) => {
	const session = await getSession(
		request.headers.get("Cookie")
	);
	let req = request

	let url = new URL(req.url)
	let code = url.searchParams.get("code")

	if (session.has("userID")) {
		console.log("test")
		let cookie = session.get("userID")
		let user = await getUserFromDB(cookie)
		let userTokenDate = new Date(user.fields.expiresIn.timestampValue)

		if (userTokenDate < new Date()) {
			await deleteDocument(cookie)
			return redirect(`/login`, {
				headers: { "Set-Cookie": await destroySession(session) }
			})
		}
	}

	let tokenData = await getToken("https://discord.com/api/oauth2/token", {
		"client_id": config.clientID,
		"client_secret": config.clientSecret,
		"grant_type": "authorization_code",
		"code": code,
		"redirect_uri": `${url.protocol}//${url.host}/success`
	})

	let userData = await getUser(tokenData.access_token)
	let userGuilds = await getGuilds(tokenData.access_token)

	const fb = await writeToken({user: userData, guilds: userGuilds, token: tokenData})

	session.set("userID", fb.name)

	return redirect("/dashboard", {
		headers: {
			"Set-Cookie": await commitSession(session)
		}
	}) //await getUser(tokenData.access_token)
}

export default function success() {
	let data = useLoaderData()
	return (
		<div>
			<h1>Welcome {data.username}</h1>
		</div>
	)
}
