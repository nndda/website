// BUILD SCRIPT

import {
  writeTextFile,
  createResolver,
  type DirResolver,
} from "./utils";
const abs: DirResolver = createResolver(__dirname);

// ----------------------------------------------------------------------------

import {
  icon,
  type IconDefinition,
} from "@fortawesome/fontawesome-svg-core";

import {
  faBox,
  faBug,
  faCalendar,
  faCaretDown,
  faChartArea,
  faClock,
  faCode,
  faCodeFork,
  faFire,
  faLanguage,
  faLink,
  faLocationDot,
  faNoteSticky,
  faScaleBalanced,
  faStar,
  faUserTag,
  faVolumeHigh,
  faX,
} from "@fortawesome/free-solid-svg-icons";

// ----------------------------------------------------------------------------

import {
  siArtstation,
  siBluesky,
  siCss,
  siGithub,
  siGodotengine,
  siHandlebarsdotjs,
  siHtml5,
  siItchdotio,
  siJavascript,
  siMastodon,
  siPatreon,
  siPython,
  // siRust,
  siSass,
  siTypescript,
  siX,
  type SimpleIcon
} from "simple-icons";

const siAliases: Record<string, string> = {
  "CSS": siCss.svg,
  "GDScript": siGodotengine.svg,
  "Handlebars": siHandlebarsdotjs.svg,
  "HTML": siHtml5.svg,
  "JavaScript": siJavascript.svg,
  "Python": siPython.svg,
  "SCSS": siSass.svg,
  // "Rust": siRust.svg,
  "TypeScript": siTypescript.svg,
}

// ----------------------------------------------------------------------------

function toHTML(name: IconDefinition): string {
  return icon(name).html.join();
}

function fa2HTML(name: IconDefinition): string {
  return icon(name).html.join();
}

function clearAndUpper(str: string) {
  return str.replace(/-/, "").toUpperCase();
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, clearAndUpper);
}

function createIconDefs(filename: string, icons: IconDefinition[]): void {
  writeTextFile(abs(filename),
    icons.map(ico => {
      return `export const icon${toPascalCase(ico.iconName)}=\`${toHTML(ico)}\``;
    }).join(";")
  );
}

function createIconDefsGrouped(
  groupName: string,
  faIcons: IconDefinition[] = [],
  siIcons: SimpleIcon[] = [],
  iconsOther: Record<string, string> = {},
  ): void {
  writeTextFile(abs(`./${groupName}.js`),
    `const i={`
    +
    [
      ...faIcons.map(ico => {
        return `"${ico.iconName}": \`${fa2HTML(ico)}\``
      }),
      ...siIcons.map(ico => {
        return `"${ico.slug}": \`${ico.svg}\``
      }),
      ...Object.entries(iconsOther)
        .map(([ico, svg]) => {
          return `"${ico}": \`${svg}\``
        }),
    ].join(",")
    +
    "};"
    +
    `document.querySelectorAll(\`i.${groupName}\`).forEach(e=>{e.outerHTML=i[e.getAttribute("data-i")]})`
  );
}

createIconDefs(
  "../icons.js",
  [
    faCaretDown,
    faX,
  ],
);

createIconDefsGrouped(
  "profile",
  [
    faLanguage,
    faLocationDot,
    faUserTag,
    faVolumeHigh,
  ],
);

createIconDefsGrouped(
  "overview",
  [
    faCalendar,
    faChartArea,
    faFire,
  ],
  [],
  siAliases
);

createIconDefsGrouped(
  "links",
  [
    faLink,
  ],
  [
    siArtstation,
    siBluesky,
    siItchdotio,
    siMastodon,
    siPatreon,
    siX,
  ],
);

createIconDefsGrouped(
  "g",
  [
    faBox,
    faBug,
    faClock,
    faCode,
    faCodeFork,
    faNoteSticky,
    faScaleBalanced,
    faStar,
  ],
  [
    siArtstation,
    siGithub,
    siItchdotio,
  ],
);