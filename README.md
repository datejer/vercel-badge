# vercel-badge

![Vercel](https://vercelbadge.vercel.app/api/datejer/vercel-badge)

Simple serverless service/utility for embedding a Vercel deployment badge in your public github repository or on your website.

## Usage

```
![Vercel](https://vercelbadge.vercel.app/api/[owner]/[repo])
```

Replace `[owner]` with the username of the repo owner, or the organization name under which the repository is located.

Replace `[repo]` with the repository name.

(optional) Add the `?style=` parameter to change the visual badge style.

| Parameter | Types                                                                           | Description                             | Example                                                                       |
| --------- | ------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| style     | Default: `flat`<br>Available: `flat`, `flat-square`, `for-the-badge`, `plastic` | Select the visual style for your badge. | `https://vercelbadge.vercel.app/api/datejer/vercel-badge?style=for-the-badge` |

## Examples

These are all of the possible Vercel deployment statuses. (`flat` style)

![Passing Demo](https://vercelbadge.vercel.app/assets/flat/passing.svg)
![Pending Demo](https://vercelbadge.vercel.app/assets/flat/pending.svg)
![Failed Demo](https://vercelbadge.vercel.app/assets/flat/failed.svg)
![None Demo](https://vercelbadge.vercel.app/assets/flat/none.svg)

---

`flat-square` style: ![Passing Flat Square Demo](https://vercelbadge.vercel.app/assets/flat-square/passing.svg)

`for-the-badge` style: ![Passing For The Badge Demo](https://vercelbadge.vercel.app/assets/for-the-badge/passing.svg)

`plastic` style: ![Passing Plastic Demo](https://vercelbadge.vercel.app/assets/plastic/passing.svg)

---

## Ratelimits

This project uses the GitHub API with an OAuth app's ID and Secret to authenticate requests in order to up the ratelimit to 5k requests per hour. The publicly available deployment uses my private OAuth app credentials, so it's highly advised to deploy your own Vercel instance with your own credentials to avoid ratelimiting, especially with bigger projects.

You can check the current GitHub API ratelimit by GETing /api/ratelimit

```
GET https://vercelbadge.vercel.app/api/ratelimit
```

## Deploying

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdatejer%2Fvercel-badge%2Ftree%2Fmaster)

You can deploy your own Vercel instance of this project. In order to do that you must create a GitHub OAuth app and pass the Client ID and Client Secret as two environment variables. (respectively `ID` and `SECRET`)

## Contributing

Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md)
