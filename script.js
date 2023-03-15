document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", () => {
    const cursor = document.querySelector(".cursor");
    const banner = document.querySelector(".banner");

    document.addEventListener("mousedown", () => {
      cursor.classList.add("click");
    });

    document.addEventListener("mouseup", () => {
      cursor.classList.remove("click");
    });

    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    let mirrorEls = document.querySelectorAll(".mirror-wrapp.active");

    let cursorDirection = 1;
    let cursorDirectionCurrent = 1;

    function animateMirror(e) {
      let procentLight = Math.min(
        Math.max(
          (Math.floor((e.clientX / window.innerWidth) * 100) - 20) * 2,
          0
        ) - 100,
        0
      );

      gsap
        .timeline({
          defaults: {
            ease: "power1.out",
          },
        })
        .to(".mirror-over", {
          duration: 1,
          x: e.clientX / 7,
          stagger: e.movementX < 0 ? -0.2 : 0.2,
          ease: "power1.out",
        })
        .to(
          ".mirror-over",
          {
            duration: 0.5,
            alpha: 9,
            stagger: e.movementX < 0 ? -0.17 : 0.17,
            ease: "power1.out",
          },
          "<"
        )
        .to(
          ".mirror-over",
          {
            duration: 0.5,
            alpha: 1,
            stagger: e.movementX < 0 ? -0.2 : 0.2,
            ease: "power1.out",
          },
          "<0.5"
        )
        .to(
          ".mirror-img__left .mirror-light",
          {
            duration: 0.7,
            x: procentLight,
            stagger: e.movementX < 0 ? -0.1 : 0.1,
          },
          "<-0.2"
        )
        .to(
          ".mirror-img__right .mirror-light",
          {
            duration: 0.7,
            x: -procentLight,
            stagger: e.movementX < 0 ? -0.1 : 0.1,
          },
          "<-0.2"
        );
    }

    function setWidthMirror() {
      mirrorEls.forEach((mirror) => {
        let widthMirror = mirror.offsetWidth + "px";
        mirror.querySelectorAll("img").forEach((img) => {
          img.style.width = widthMirror;
        });
      });
    }

    setWidthMirror();

    window.addEventListener("resize", () => {
      setWidthMirror();
    });

    banner.addEventListener("click", () => {
      if (!document.getElementById("hero").classList.contains("full")) {
        document.getElementById("hero").classList.add("full");
        document.getElementById("bottom-info").classList.add("scroll");
        cursor.classList.remove("watch");

        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
            onComplete: () => {
              document.querySelector(".hero-close").classList.add("active");
            },
          })
          .to(
            ".mirror-over",
            {
              duration: 2,
              x: 0,
              alpha: 1,
              ease: "power1.out",
            },
            "<"
          )
          .call(() => {
            document
              .getElementById("hero")
              .querySelector(".mirror-wrapp")
              .classList.add("active");
            mirrorEls = document.querySelectorAll(".mirror-wrapp.active");
            mirrorEls.forEach((mirrorEl) => {
              mirrorEl.addEventListener("mousemove", animateMirror, true);
            });
          });
      }

      if (
        !document
          .getElementById("some-other-section")
          .classList.contains("show")
      ) {
        document.getElementById("some-other-section").classList.add("show");
      }
    });

    document.querySelector(".hero-close").addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("hero").classList.remove("full");
      document.getElementById("bottom-info").classList.remove("scroll");
      document.getElementById("some-other-section").classList.remove("show");

      mirrorEls.forEach((mirrorEl) => {
        mirrorEl.removeEventListener("mousemove", animateMirror, true);
        mirrorEl.classList.remove("active");
      });

      document.querySelector(".hero-close").classList.remove("active");

      gsap
        .timeline({
          defaults: {
            ease: "none",
          },
          onComplete: () => {
            document
              .getElementById("hero")
              .querySelector(".mirror-wrapp")
              .classList.remove("active");
          },
        })
        .to(
          ".mirror-over",
          {
            duration: 2,
            x: "-10%",
            alpha: 7,
            overwrite: true,
            ease: "power1.out",
          },
          "<"
        )
        .to(
          ".mirror-img__left .mirror-light",
          {
            duration: 0.7,
            x: "-100%",
            stagger: 0.1,
          },
          "<"
        )
        .to(
          ".mirror-img__right .mirror-light",
          {
            duration: 0.7,
            x: "100%",
            stagger: 0.1,
          },
          "<"
        );
    });
  });
});
