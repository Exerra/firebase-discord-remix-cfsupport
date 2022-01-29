import {useLoaderData} from "remix";

export let loader = (req) => {
	return new URL(req.request.url)
}

export default function test()  {
	console.log(useLoaderData())
	return (
		<a>b</a>
	)
}