const fs = require("fs");
import { JSDOM } from "jsdom";

const icons = require("./vendor/icons");
import { contentProjects } from "./scripts/content-projects";

// this is so dumb

var production = process.argv.includes("--production", 2)
console.log("Preparing entry file for", production ? "production" : "development", "mode")

const new_entry = "./src/" + (production ? "index.html" : "index-dev.html");

fs.readFile( "./src/index-template.html", "utf8", (err, data) => {
	if (err) {
		console.log(err);
		return
	}

	const dom = new JSDOM(data);
	const $ = require("jquery")(dom.window);

	if (production) {
		$(".dev-remove").removeClass(".dev-remove");
	} else {
		$(".dev-remove").remove();
	}

	const iconElem = $("img[data-si]");
	for (let i = iconElem.length - 1; i >= 0; i--) {
		let iconSlug : string = iconElem[i].getAttribute("data-si");
		$(`img[data-si="${iconSlug}"]`)
			.replaceWith(icons[iconSlug]);
	}

	$("#CONTENT-PROJECTS").replaceWith(contentProjects);
	// $("#CONTENT-ILLUSTRATIONS").replaceWith();

	fs.writeFile(new_entry, dom.serialize(), (err) => {
		if (err) {
			console.log(err);
			return
		}
	});
});