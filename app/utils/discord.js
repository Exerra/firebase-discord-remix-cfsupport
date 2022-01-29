const getToken = async (url, data) => {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		},
		body: new URLSearchParams(data)
	})

	return response.json()
}

const getUser = async (token) => {
	const response = await fetch("https://discord.com/api/users/@me", {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})

	return response.json()
}

const getGuilds = async (token) => {
	const response = await fetch("https://discord.com/api/users/@me/guilds", {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})

	return response.json()
}

export {getToken, getUser, getGuilds}