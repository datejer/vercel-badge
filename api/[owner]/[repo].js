const axios = require("axios");

module.exports = (req, res) => {
	const { owner, repo } = req.query;

	axios
		.get(`https://api.github.com/repos/${owner}/${repo}/deployments`)
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

			axios.get(latest.statuses_url).then((response) => {
				if (response.data[0].state === "success")
					return res.status(200).json({
						url: "https://img.shields.io/badge/vercel-passing-success",
					});
				else if (response.data[0].state === "failure")
					return res.status(200).json({
						url: "https://img.shields.io/badge/vercel-failed-critical",
					});
				else if (response.data[0].state === "pending")
					return res.status(200).json({
						url: "https://img.shields.io/badge/vercel-pending-yellow",
					});
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
