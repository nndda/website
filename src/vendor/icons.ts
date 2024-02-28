const simpleIcons = require("simple-icons");

// let icons = {};
let icons : Icons = {};

interface Icons {
	[key : string] : string
}

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
	"siJekyll",
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
	icons[icon.slug] = icon.svg;
});

module.exports = icons;