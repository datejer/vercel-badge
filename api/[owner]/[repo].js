const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
	const { owner, repo } = req.query;

	let style;
	if (!req.query.style) style = "flat";
	else if (
		req.query.style === "flat" ||
		req.query.style === "flat-square" ||
		req.query.style === "for-the-badge" ||
		req.query.style === "plastic"
	)
		style = req.query.style;

	axios
		.get(`https://api.github.com/repos/${owner}/${repo}/deployments`, {
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${process.env.ID}:${process.env.SECRET}`
				).toString("base64")}`,
			},
		})
		.then((response) => {
			if (response.data.length <= 0) {
				res.setHeader("Content-Type", "image/svg+xml");
				return fs
					.createReadStream(
						path.join(__dirname, `../../assets/${style}/none.svg`)
					)
					.pipe(res);
			}

			const vercelDeployments = response.data.filter(
				(deployment) =>
					deployment.creator.login === "vercel[bot]" &&
					deployment.creator.html_url === "https://github.com/apps/vercel" &&
					deployment.creator.type === "Bot"
			);

			if (vercelDeployments.length <= 0) {
				res.setHeader("Content-Type", "image/svg+xml");
				return fs
					.createReadStream(
						path.join(__dirname, `../../assets/${style}/none.svg`)
					)
					.pipe(res);
			}

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
						return fs
							.createReadStream(
								path.join(__dirname, `../../assets/${style}/passing.svg`)
							)
							.pipe(res);
					else if (response.data[0].state === "failure")
						return fs
							.createReadStream(
								path.join(__dirname, `../../assets/${style}/failed.svg`)
							)
							.pipe(res);
					else if (response.data[0].state === "pending")
						return fs
							.createReadStream(
								path.join(__dirname, `../../assets/${style}/pending.svg`)
							)
							.pipe(res);
				});
		})
		.catch((error) => {
			res.setHeader("Content-Type", "image/svg+xml");
			return fs
				.createReadStream(
					path.join(__dirname, `../../assets/${style}/error.svg`)
				)
				.pipe(res);
		});
};
