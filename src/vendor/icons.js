const {
	siItchdotio,
	siGithub,
	siMastodon,
	siInstagram,
	siArtstation,

	siPython,
	siJavascript,
	siGodotengine,
} = require("simple-icons");

let icons = {};

[
	siItchdotio,
	siGithub,
	siMastodon,
	siInstagram,
	siArtstation,

	siPython,
	siJavascript,
	siGodotengine,
].forEach((n) => {
	icons[n.slug] = n.svg
});

module.exports = icons;