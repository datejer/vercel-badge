const axios = require("axios");

module.exports = (req, res) => {
	axios
		.get(`https://api.github.com/rate_limit`, {
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${process.env.ID}:${process.env.SECRET}`
				).toString("base64")}`,
			},
		})
		.then((response) => {
			return res.status(200).json(response.data);
		})
		.catch((error) => {
			return res.status(400).json(error.response.data);
		});
};
