document.addEventListener("DOMContentLoaded", function () {
  let lottieContainer = document.querySelector(".animation");

  if (lottieContainer) {
    LottieScrollTrigger({
      trigger: ".animation",
      start: "top center",
      endTrigger: ".end-lottie",
      end: `bottom center+=${
        document.querySelector(".animation").offsetHeight
      }`,
      renderer: "svg",
      target: ".animation",
      path: "./hero-lottie.json",
      speed: "fast", // Added speed parameter
      scrub: 2,
    });
  }
});

function LottieScrollTrigger(vars) {
  let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0];
  let speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" }; // Corrected spelling and added let declaration
  let st = {
    trigger: vars.trigger,
    end: speeds[vars.speed] || "+=1000", // Fixed using speeds instead of speed
    scrub: vars.scrub || 1, // Added default value for scrub
    markers: false,
  };
  let ctx = gsap.context && gsap.context(); // Added let declaration
  let animation = lottie.loadAnimation({
    container: target,
    renderer: vars.renderer || "svg",
    loop: false,
    autoplay: false,
    path: vars.path,
    rendererSettings: vars.rendererSettings || {
      preserveAspectRatio: "xMidYMid slice", // Corrected preserveAspectRatio spelling
    },
  });
  for (let p in vars) {
    st[p] = vars[p];
  }
  animation.addEventListener("DOMLoaded", function () {
    let createTween = function () {
      animation.frameTween = gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        ease: "none",
        onUpdate: () => animation.goToAndStop(playhead.frame, true),
        scrollTrigger: st,
      });
      return () => animation.destroy && animation.destroy();
    };
    ctx && ctx.add ? ctx.add(createTween) : createTween();
  });
  return animation;
}
