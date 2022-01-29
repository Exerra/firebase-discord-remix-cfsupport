# firebase-discord-remix-cfsupport

- [Remix Docs](https://remix.run/docs)

## The issue

When trying to add environment variables thru the Worker dashboard for this project, it errors out with this issue
![Error that dashboard throws](https://cdn.discordapp.com/attachments/779390076219686943/936760501680107661/Screenshot_2022-01-29_at_01.10.54.png)

As you can see, this project is using [Remix](https://remix.run) and was created with the CF Workers preset in the `npx create-remix@latest` command.
Everything except `./app`, `./wrangler.toml` and `./package*.json` is in its original state from the npx command.

If I use wrangler (1.19.5) for the env vars, it gets set, and I can see it in the dashboard.

Also, I can only replicate this issue on this project, all the other Remix projects I have work flawlessly.

### Useful pointers, maybe?
What separates this project from the rest of my Remix projects is that it has the `firebase` and `@sagi.io/workers-jwt` NPM packages installed.

## Development

### Setup
Since this is a clone of the actual repo (but with the same issue), I have removed sensitive info which I tried to actually put in the env vars

What does it mean? If you want to have the project be 100% functional go do the steps below, or don't I guess.

#### Firebase
1) Create a new Firebase project ![Screenshot of Firebase project creation](https://cdn.discordapp.com/attachments/713134823706984564/936947085863944232/Screenshot_2022-01-29_at_13.31.27.png)
2) Create a web app, copy the config and chuck it into `./app/info.js` exports.firebase
3) Navigate to **Firestore** database (not realtime) and create it
4) Create a new collection with the ID `user` ![Screenshot of Firestore collection creation](https://cdn.discordapp.com/attachments/713134823706984564/936947769594241024/Screenshot_2022-01-29_at_13.33.38.png)
5) Populate it with something, doesn't matter what
6) Navigate to project settings -> Service accounts, wait for admin account to be created and then download the key
7) Chuck the private key JSON into `./app/info.js` exports.privateKey

#### Discord
Wasn't that fun and exciting? Good news, you have to go get stuff from Discord now!

1) Navigate to [discord.com/developers/applications](https://discord.com/developers/applications)
2) Create a new application
3) Go to OAuth settings and grab the client ID and secret
4) Chuck those two into `./app/info.js` exports.config
5) Add redirects because Discord wants to be a secure little OAuth provider

Aaand voila, you're done
### Running it

You will be running two processes, but with one command:

- The Miniflare server 
- The Remix development server

```sh
# starts both the remix and miniflare server with concurrently
$ yarn dev
```

Open up [http://127.0.0.1:8787](http://127.0.0.1:8787) and you should be ready to go!

## Deployment

Deployment is handled by the GH Action set up for this repository, which uses wrangler. If you fork it, make sure to create an actions secret for `CF_API_TOKEN` where you can just chuck a workers API token in.