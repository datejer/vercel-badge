module.exports = (req, res) => {
	res.json({
		message:
			"Use /[owner]/[repo] to get a Vercel deployment badge for your github repository!",
	});
};
