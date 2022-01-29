import {destroySession, getSession} from "~/utils/sessions";
import {deleteDocument, getUserFromDB} from "~/utils/db.server";
import {getToken, getGuilds, getUser} from "~/utils/discord";
import {redirect, useLoaderData} from "remix";
import {config} from "~/info";

export let loader = async ({ request }) => {
	const session = await getSession(
		request.headers.get("Cookie")
	);

	if (!session.has("userID")) return redirect("/login")

	let cookie = session.get("userID")
	let user = await getUserFromDB(cookie)
	let userTokenDate = new Date(user.fields.expiresIn.timestampValue)

	if (userTokenDate < new Date()) {
		await deleteDocument(cookie)
		return redirect(`/login`, {
			headers: { "Set-Cookie": await destroySession(session) }
		})
	}

	let token = user.fields.token.stringValue

	let userData = await getUser(token)
	let userGuilds = await getGuilds(token)

	return {user: userData, guilds: userGuilds}
}

export default function dashboard() {
	let data = useLoaderData()

	console.log(data)

	return (
		<div>
			<h1>Welcome {data.user.username}</h1>
			<p>email: nice try</p>
		</div>
	)
}