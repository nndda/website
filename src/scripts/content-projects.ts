let projects : Array<ProjectItem> = [
  // --------------------------------------------------
  {
    title: "",
    description: " ",
    thumb: "",
    url: "",
    labels: [
      {
        title: "",
        svg: "",
      },
    ],
  },
  // --------------------------------------------------
  {
    title: "",
    description: " ",
    thumb: "",
    url: "",
    labels: [
      {
        title: "",
        svg: "",
      },
    ],
  },
  // --------------------------------------------------
];

const icons = require("../vendor/icons");

interface ProjectItem {
  title: string,
  description: string,
  thumb: string,
  url: string,
  labels: Array<ProjectLabel>,
}

interface ProjectLabel {
  title?: string,
  svg?: string,
}

function buildProjectLabels(labels : Array<ProjectLabel>) : string {
  let output = ""

  labels.forEach((label) => {
    output += `
    <span class="label">
      ${label.svg}
      ${label.title}
    </span>
    `
  });

  return output
}

function buildProjectItem(project : ProjectItem) : string {
  return `
    <div class="project" style="--thumb:url('${project.thumb}')">
    <div class="project-content">
      <div class="project-heading">
        <h1 class="project-title">
          <a
            target="_blank"
            href="${project.url}"
            referrerpolicy="origin"
            rel="nofollow noopener"
          >
            ${project.title}
          </a>
        </h1>
      </div>
      <div class="separator-a"></div>
      <p>
        ${project.description}
      </p>
      <div class="project-labels">
        ${buildProjectLabels(project.labels)}
      </div>
    </div>
    </div>
  `
}

export const contentProjects = projects.map((n) => buildProjectItem(n)).join("");
// export default projects.map((n) => buildProjectItem(n)).join("");;