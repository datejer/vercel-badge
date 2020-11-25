# vercel-badge

![Vercel](https://vercelbadge.vercel.app/api/datejer/vercel-badge)

Simple serverless service/utility for embedding a Vercel deployment badge in your public github repository or on your website.

## Usage

```
![Vercel](https://vercelbadge.vercel.app/api/[owner]/[repo])
```

Replace `[owner]` with the username of the repo owner, or the organization name under which the repository is located.

Replace `[repo]` with the repository name.

## Examples

These are all of the possible Vercel deployment statuses.

![Passing Demo](https://vercelbadge.vercel.app/assets/passing.svg)
![Pending Demo](https://vercelbadge.vercel.app/assets/pending.svg)
![Failed Demo](https://vercelbadge.vercel.app/assets/failed.svg)
![None Demo](https://vercelbadge.vercel.app/assets/none.svg)

## Ratelimits

This project uses the GitHub API with an OAuth app's ID and Secret to authenticate requests in order to up the ratelimit to 5k requests per hour. The publicly available deployment uses my private OAuth app credentials, so it's highly advised to deploy your own Vercel instance with your own credentials to avoid ratelimiting, especially with bigger projects.

## Deploying

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdatejer%2Fvercel-badge%2Ftree%2Fmaster)

You can deploy your own Vercel instance of this project. In order to do that you must create a GitHub OAuth app and pass the Client ID and Client Secret as two environment variables. (respectively `ID` and `SECRET`)

## Contributing

Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md)
