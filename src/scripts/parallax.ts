const Parallax = require("parallax-js"),
    scene = document.getElementById("intro-cover-images");

let parallaxInstance = new Parallax(scene, {
    scalarY: 8.0,
});

// const simpleParallax = require("simple-parallax-js");
// const scrollParallaxElems = document.querySelectorAll("#intro > .scroll-parallax");
// const scrollParallaxElems = document.querySelectorAll(".project");
// new simpleParallax(scrollParallaxElems);