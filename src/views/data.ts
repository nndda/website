// BUILD SCRIPT

import { parse } from "yaml";
import fs from "fs";
import { execSync } from "child_process";

import {
  createResolver,
  type DirResolver,
} from "../scripts/build/utils";
const abs: DirResolver = createResolver(__dirname);

// ---------------------------------------------------------------------------------------

execSync("npx ts-node ./src/scripts/build/icons.ts");

// =======================================================================================

type IconDefs = Record<string, string>; // icon slug, svg string

// ---------------------------------------------------------------------------------------

import { type SimpleIcon } from "simple-icons";
import * as siIconsRaw from 'simple-icons';

export const siIcons: IconDefs = Object.keys(siIconsRaw).reduce(
  (acc, val) => {
    const icon: SimpleIcon = siIconsRaw[val];
    acc[
      icon.slug
    ] = icon.svg;
    return acc;
  }, {} as IconDefs
);

// ---------------------------------------------------------------------------------------

import { icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

export const faIcons: IconDefs = Object.keys(fas).reduce(
  (acc, val) => {
    acc[
      fas[val].iconName.replace("-", "_")
    ] = icon(fas[val]).html.join();
    return acc;
  }, {} as IconDefs
);

// ---------------------------------------------------------------------------------------

function urlStr(url: string): string {
  if (url.startsWith("#")) {
    return url;
  }
  if (url.startsWith("\\#")) {
    return url.replace("\\#", "#");
  }
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "https://" + url;
  }
  return url;
}

// ---------------------------------------------------------------------------------------

const siteData = parse(
  fs.readFileSync(abs("../../site-config.yaml"), { encoding: "utf-8" })
);

if (process.env.SITE_EXT) {
  execSync(`
    curl ${process.env.SITE_EXT} --output ext.zip && unzip ext.zip .
  `)
  fs.readFileSync(abs("../../site-config-ext.yaml"), { encoding: "utf-8" })
}

// ---------------------------------------------------------------------------------------

const repoURL = urlStr(siteData.repoURL);
const commitSHA = (
  process.env.CF_PAGES_COMMIT_SHA ??
  process.env.COMMIT_SHA ??
  ""
);

siteData!.nav.links.forEach((navLinkData: any, i: number) => {
  siteData.nav.links[i]!.url = urlStr(navLinkData.url);

  if (Object.prototype.hasOwnProperty.call(navLinkData, "icon")) {
    siteData.nav.links[i].iconSlug = navLinkData.icon as string;
    siteData.nav.links[i].icon = siIcons[(navLinkData.icon as string)];
  }
});

siteData!.socials.forEach((socialLinkData: any, i: number) => {
  socialLinkData.links.forEach((socialLink: any, n: number) => {
    siteData.socials[i].links[n].urlS = socialLink.url;
    siteData.socials[i].links[n].url = urlStr(socialLink.url);

    if (Object.prototype.hasOwnProperty.call(socialLink, "icon")) {
      siteData.socials[i].links[n].iconSlug = socialLink.icon as string;
      siteData.socials[i].links[n].icon = siIcons[(socialLink.icon as string)];
    }
  });

});

import { updateSocialRedirects } from "../scripts/redirects";
const socialRedirData = [] as any[];
siteData.socials.forEach((item: any) => {socialRedirData.push(...item.links)});
updateSocialRedirects(socialRedirData);

// =======================================================================================

// temporarily disabled

// const projectCatData: object[] = [{
//   name: "All",
//   id: "All",
//   default: true,
// }];
// const projectCatReadable: string[] = [];

// ---------------------------------------------------------------------------------------

// const projectPlatformData: object[] = [];
// const projectPlatformReadble: string[] = [];

// =======================================================================================

// siteData!.projects.forEach((projectData: any) => {

//   const projectCat: string = projectData!.category;

//   if (!projectCatReadable.includes(projectCat)) {
//     projectCatReadable.push(projectCat);
//     const id = projectCat.replace(" ", "");

//     projectCatData.push({
//       name: projectCat,
//       id: id,
//     });
//   }

//   // ---------------------------------------------------------------------------------------

//   const projectPlatform: string = projectData!.platform;

//   if (!projectPlatformReadble.includes(projectPlatform)) {
//     projectPlatformReadble.push(projectPlatform);
//     const id = projectPlatform
//       .replace(" ", "")
//       .replace("/", "");

//     projectPlatformData.push({
//       name: projectPlatform,
//       id: id,
//     });
//   }

// });

// =======================================================================================

const ghLangsData = require("../api/langs.json");
const ghContribsData = require("../api/contribs.json");

// import ghLangsData from "../api/langs.json" with { type: "json" };
// import ghContribsData from "../api/contribs.json" with { type: "json" };

// =======================================================================================

export default {
  "repoURL": repoURL,

	nav: {
    links: [ ],
  },

  socials: [
  ],

  projects: [ ],
  // temporarily disabled
  // projectData: {
    // categories: projectCatData,
    // platforms: projectPlatformData,
  // },

  icons: faIcons,
  brands: siIcons,

  siteOptions: [
    {
      icon: faIcons.star,
      name: "Star",
      url: `${repoURL}`,
    },
    {
      icon: faIcons.code_fork,
      name: "Fork",
      url: `${repoURL}/fork`,
    },
    {
      icon: faIcons.bug,
      name: "Issues",
      url: `${repoURL}/issues`,
    },
  ],

  buildTimetamp: new Date(),
  buildCommitSHAFull: commitSHA,
  buildCommitSHA: commitSHA.substring(0, 16),

  year: new Date().getFullYear(),

  ghLangs: ghLangsData,
  ghContribs: ghContribsData,

  ...siteData,
}