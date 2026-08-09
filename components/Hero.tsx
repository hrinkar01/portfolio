// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import SideNav from "./SideNav";
// import { useScrollProgress, lerp, fadeOpacity } from "./useScrollProgress";

// // ---- Full position control -------------------------------------------
// // Change top/right here to move the image anywhere within the hero.
// // Units: vh (top) / vw (right). This is a STATIC position — it no longer
// // moves on scroll, but it's positioned with these coordinates, same as before.
// export const IMAGE_POSITION = {
//   start: { top: 18, right: 12, scale: 1 },
// };

// // How much extra scroll distance (in viewport heights) the nav's parallax
// // runs over before the effect is "complete" and normal page scroll continues.
// const HERO_SCROLL_SPAN_VH = 100;

// // ------------------------------------------------------------------------
// // Fade timing (FADE_START / FADE_END) lives in useScrollProgress.ts as
// // `fadeOpacity`, used by SideNav.

// export default function Hero() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const progress = useScrollProgress(sectionRef);

//   // Intro text fades/shrinks slightly as the user scrolls past the hero.
//   const textOpacity = lerp(1, 0, Math.min(progress * 1.6, 1));
//   const textShift = lerp(0, -40, progress);

//   return (
//     <section
//       ref={sectionRef}
//       style={{ minHeight: `${HERO_SCROLL_SPAN_VH}vh` }}
//       className="relative w-full"
//     >
//       <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-6 lg:px-16 relative">
//         {/* Left: intro text */}
//         <div
//           style={{
//             opacity: textOpacity,
//             transform: `translateY(${textShift}px)`,
//           }}
//           className="max-w-xl transition-opacity duration-100"
//         >
//           <h1 className="font-mono text-5xl font-bold leading-tight text-ember sm:text-6xl md:text-7xl">
//             Hrinkar Bothra
//           </h1>
//           <div className="mt-6 space-y-4 text-base leading-relaxed text-mist sm:text-lg">
//             <p>
//               I&apos;m I’m a multidisciplinary builder with interests spanning {" "}
//               <span className="text-white">AI/ML</span>,{" "}
//               <span className="text-white">IoT</span>, and{" "}
//               <span className="text-white">Reverse Engineering</span>, and{" "}
//               <span className="text-white">embedded systems</span>.
//             </p>
//             <p>
//               I enjoy going from low-level systems and hardware to intelligent applications, constantly exploring how different layers of technology work together.
//             </p>
//             <p>
//               My focus is on building, experimenting, and solving real-world problems through technology.
//             </p>
//           </div>
//         </div>

//         {/* Right: image — absolutely positioned via IMAGE_POSITION, but
//             NOT fixed, so it scrolls away with the section normally. */}
//         <div
//           style={{
//             position: "absolute",
//             top: `${IMAGE_POSITION.start.top}vh`,
//             right: `${IMAGE_POSITION.start.right}vw`,
//             transform: `scale(${IMAGE_POSITION.start.scale})`,
//             transformOrigin: "top right",
//           }}
//           className="w-full max-w-md sm:max-w-lg"
//         >
//           <Image
//             src="/images/isometric-room.png"
//             alt="Isometric illustration of a workstation with a monitor, guitars, and drum kit"
//             width={900}
//             height={900}
//             priority
//             className="w-full drop-shadow-[0_0_40px_rgba(255,106,61,0.15)]"
//           />
//         </div>

//         <SideNav progress={progress} fadeOpacity={fadeOpacity(progress)} />
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
//import Image from "next/image";
import SideNav from "./SideNav";
import { useScrollProgress, lerp, fadeOpacity } from "./useScrollProgress";

// ---- Full position control (desktop only, see isDesktop below) --------
// Change top/right here to move the image anywhere within the hero.
// Units: vh (top) / vw (right). Static position — only applied at lg+;
// on phones/tablets the image flows in normal document order instead.
export const IMAGE_POSITION = {
  start: { top: 18, right: 12, scale: 1 },
};

// How much extra scroll distance (in viewport heights) the nav's parallax
// runs over before the effect is "complete" and normal page scroll continues.
// Only used on desktop — see isDesktop below.
const HERO_SCROLL_SPAN_VH = 100;

// ------------------------------------------------------------------------
// Fade timing (FADE_START / FADE_END) lives in useScrollProgress.ts as
// `fadeOpacity`, used by SideNav.

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // The pinned/parallax treatment only makes sense once there's room for
  // the text and the illustration to sit side by side. Below that, the
  // absolute image position and the h-screen sticky wrapper would either
  // overlap the text or get clipped, so we switch to a plain stacked
  // layout instead of trying to force the desktop composition to fit.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Intro text fades/shrinks slightly as the user scrolls past the hero —
  // desktop only. On mobile it just stays put.
  const textOpacity = isDesktop ? lerp(1, 0, Math.min(progress * 1.6, 1)) : 1;
  const textShift = isDesktop ? lerp(0, -40, progress) : 0;

  return (
    <section
      ref={sectionRef}
      style={isDesktop ? { minHeight: `${HERO_SCROLL_SPAN_VH}vh` } : undefined}
      className="relative w-full"
    >
      <div
        className={`flex w-full flex-col justify-center px-6 lg:px-16 ${
          isDesktop
            ? "sticky top-0 h-screen overflow-hidden"
            : "relative gap-10 py-16"
        }`}
      >
        {/* Left: intro text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textShift}px)`,
          }}
          className="max-w-xl transition-opacity duration-100"
        >
          <h1 className="font-mono text-5xl font-bold leading-tight text-ember sm:text-6xl md:text-7xl">
            Hrinkar Bothra
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-mist sm:text-lg">
            <p>
              I&apos;m a multidisciplinary builder with interests spanning{" "}
              <span className="text-white">AI/ML</span>,{" "}
              <span className="text-white">IoT</span>,{" "}
              <span className="text-white">Reverse Engineering</span>, and{" "}
              <span className="text-white">embedded systems</span>.
            </p>
            <p>
              I enjoy going from low-level systems and hardware to intelligent
              applications, constantly exploring how different layers of
              technology work together.
            </p>
            <p>
              My focus is on building, experimenting, and solving real-world
              problems through technology.
            </p>
          </div>
        </div>

        {/* Right: image.
            Desktop (lg+): absolutely positioned via IMAGE_POSITION, pinned
            with the sticky section above.
            Mobile/tablet: normal flow, centered, capped smaller — no
            absolute positioning, so nothing can overlap the text. */}
        <div
          style={
            isDesktop
              ? {
                  position: "absolute",
                  top: `${IMAGE_POSITION.start.top}vh`,
                  right: `${IMAGE_POSITION.start.right}vw`,
                  transform: `scale(${IMAGE_POSITION.start.scale})`,
                  transformOrigin: "top right",
                }
              : undefined
          }
          className="mx-auto w-full max-w-[260px] sm:max-w-sm lg:max-w-lg"
        >
          <img
            src="/portfolio/images/isometric-room.png"
            alt="Isometric illustration of a workstation with a monitor, guitars, and drum kit"
            className="w-full drop-shadow-[0_0_40px_rgba(255,106,61,0.15)]"
          />
        </div>

        <SideNav progress={progress} fadeOpacity={isDesktop ? fadeOpacity(progress) : 1} />
      </div>
    </section>
  );
}