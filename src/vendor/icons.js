const simpleIcons = require("simple-icons");

let icons = {};

[
	"siItchdotio",
	"siGithub",
	"siMastodon",
	"siInstagram",
	"siArtstation",

	"siMedibangpaint",
	"siAseprite",
	"siInkscape",
	"siNodedotjs",
	"siSublimetext",
	"siVisualstudiocode",

	"siWebpack",
	"siGodotengine",
	"siPython",
	"siHtml5",
	"siCss3",
	"siSass",
	"siJavascript",
	"siTypescript",
	"siCsharp",
	"siCplusplus",
	"siWolframlanguage",
].forEach((n) => {
	let icon = simpleIcons[n];
	// console.log(n);
	icons[icon.slug] = icon.svg;
});

module.exports = icons;