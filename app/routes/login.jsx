import {redirect} from "remix";
import {config} from "~/info";
import {destroySession, getSession} from "~/utils/sessions";
import {deleteDocument, getUserFromDB} from "~/utils/db.server";

export let loader = async ({ request }) => {
	const session = await getSession(
		request.headers.get("Cookie")
	);

	if (session.has("userID")) {
		let cookie = session.get("userID")
		let user = await getUserFromDB(cookie)
		let userTokenDate = new Date(user.fields.expiresIn.timestampValue)

		if (userTokenDate > new Date()) return redirect(`/dashboard`)
	}

	let url = new URL(request.url)
	return redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${encodeURIComponent(`${url.protocol}//${url.host}/success`)}&response_type=code&scope=identify%20email%20guilds%20guilds.join`)
}