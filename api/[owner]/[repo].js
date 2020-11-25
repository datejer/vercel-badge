const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
	const { owner, repo } = req.query;

	axios
		.get(`https://api.github.com/repos/${owner}/${repo}/deployments`, {
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${process.env.ID}:${process.env.SECRET}`
				).toString("base64")}`,
			},
		})
		.then((response) => {
			if (response.data.length <= 0)
				return res.status(404).json({
					error: {
						code: "not_found",
						message: "The requested repository does not have any deployments.",
					},
				});

			const vercelDeployments = response.data.filter(
				(deployment) =>
					deployment.creator.login === "vercel[bot]" &&
					deployment.creator.html_url === "https://github.com/apps/vercel" &&
					deployment.creator.type === "Bot"
			);

			if (vercelDeployments.length <= 0)
				return res.status(404).json({
					error: {
						code: "not_found",
						message:
							"The requested repository does not have any Vercel deployments.",
					},
				});

			const latest = vercelDeployments[0];

			axios
				.get(latest.statuses_url, {
					headers: {
						Authorization: `Basic ${Buffer.from(
							`${process.env.ID}:${process.env.SECRET}`
						).toString("base64")}`,
					},
				})
				.then((response) => {
					res.setHeader("Content-Type", "image/svg+xml");
					if (response.data[0].state === "success")
						return res.send(
							fs.readFileSync(
								path.join(__dirname, "../../assets/passing.svg"),
								"utf8"
							)
						);
					else if (response.data[0].state === "failure")
						return res.send(
							fs.readFileSync(
								path.join(__dirname, "../../assets/failed.svg"),
								"utf8"
							)
						);
					else if (response.data[0].state === "pending")
						return res.send(
							fs.readFileSync(
								path.join(__dirname, "../../assets/pending.svg"),
								"utf8"
							)
						);
				});
		})
		.catch((error) => {
			return res.status(error.response.status).json({
				error: {
					code: error.response.statusText.toLowerCase().replace(/ /gi, "_"),
					message: "The requested repository does not have any deployments.",
				},
			});
		});
};
