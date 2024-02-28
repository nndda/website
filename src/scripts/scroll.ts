window.addEventListener("load", () => {
  const controlBar = document.querySelector(".control-bar")
  const controlBarTitle = document.getElementById("control-bar-title");

  const homeOverlayHeading = document.querySelector(".cover-overlay-heading");
  const introCover = document.querySelector(".intro-cover-container");

  const codeTagStart = document.querySelector(".code-tag-start");
  const codeTagEnd = document.querySelector(".code-tag-end");

  const sectProjects = document.getElementById("projects");
  const sectIllust = document.getElementById("illustrations");

  const observer = new IntersectionObserver( 
    ([e]) => {
      let intersected = e.intersectionRatio < 1;
      e.target.classList.toggle("sticky", intersected);
      ctaScrollDown.classList.toggle("hidden", intersected);
      homeOverlayHeading.classList.toggle("collapsed", intersected);
      introCover.classList.toggle("dim", intersected);
      codeTagStart.classList.toggle("rotate-reset", intersected);
      codeTagEnd.classList.toggle("rotate-reset", intersected);
    },
    {
      rootMargin: "-1px 0px 10px 0px",
      threshold: [1],
    }
  );

  observer.observe(controlBar);

  function controlBarScrollContents() {
    if (sectIllust.getBoundingClientRect().y < 0) {
      controlBarTitle.textContent = "illustrations";
      controlBar.setAttribute("style", "--tint-color: #fc3a78");

    } else if (sectProjects.getBoundingClientRect().y < 0) {
      controlBarTitle.textContent = "projects";
      controlBar.setAttribute("style", "--tint-color: #3ae5f9");

    } else {
      controlBarTitle.textContent = "intro";
      controlBar.setAttribute("style", "--tint-color: #eaeaea");
    }
  }

  window.addEventListener("scroll", () => controlBarScrollContents());
  document.addEventListener("load", () => controlBarScrollContents());

  const ctaScrollDown = document.getElementById("cta-scroll-down");
  ctaScrollDown.addEventListener("click", () => window.scrollBy(0, 300));
})