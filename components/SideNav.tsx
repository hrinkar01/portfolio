// "use client";

// import { lerp } from "./useScrollProgress";

// // ---- Full position control -----------------------------------------
// // Everything here is in vh/vw so it scales with viewport. Edit freely.
// export const NAV_POSITION = {
//   start: { top: 36, right: 3 }, // vh, vw — resting position (matches Hero)
//   end: { top: -60, right: 6 }, // vh, vw — drifts up off-screen while fading
// };
// const NAV_GAP_START = 16; // px, gap between buttons at rest
// const NAV_GAP_END = 8; // px, gap once compact at top
// // ----------------------------------------------------------------------

// const LINKS = [
//   { label: "Skills", href: "#skills" },
//   { label: "Projects", href: "#projects" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function SideNav({
//   progress,
//   fadeOpacity,
// }: {
//   progress: number;
//   fadeOpacity: number;
// }) {
//   const top = lerp(NAV_POSITION.start.top, NAV_POSITION.end.top, progress);
//   const right = lerp(NAV_POSITION.start.right, NAV_POSITION.end.right, progress);
//   const gap = lerp(NAV_GAP_START, NAV_GAP_END, progress);
//   const scale = lerp(1, 0.82, progress);
//   const interactive = fadeOpacity > 0.05;

//   return (
//     <nav
//       aria-label="Section navigation"
//       style={{
//         top: `${top}vh`,
//         right: `${right}vw`,
//         gap: `${gap}px`,
//         transform: `scale(${scale})`,
//         transformOrigin: "top right",
//         opacity: fadeOpacity,
//         pointerEvents: interactive ? "auto" : "none",
//       }}
//       className="fixed z-20 flex flex-col"
//     >
//       {LINKS.map((link) => (
//         <a
//           key={link.href}
//           href={link.href}
//           className="group relative overflow-hidden whitespace-nowrap rounded-lg border border-ember/40 bg-void/60
//                      px-6 py-3 text-center font-mono text-sm tracking-wide text-mist underline underline-offset-4
//                      decoration-ember/60 backdrop-blur-sm transition-all duration-300
//                      hover:border-ember hover:text-white hover:shadow-[0_0_18px_-2px_rgba(255,106,61,0.55)]
//                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
//         >
//           {link.label}
//         </a>
//       ))}
//     </nav>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { lerp } from "./useScrollProgress";

// ---- Full position control (desktop only, see isDesktop below) -------
// Everything here is in vh/vw so it scales with viewport. Edit freely.
export const NAV_POSITION = {
  start: { top: 36, right: 3 }, // vh, vw — resting position (matches Hero)
  end: { top: -60, right: 6 }, // vh, vw — drifts up off-screen while fading
};
const NAV_GAP_START = 16; // px, gap between buttons at rest
const NAV_GAP_END = 8; // px, gap once compact at top
// ----------------------------------------------------------------------

const LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const LINK_CLASS =
  "group relative overflow-hidden whitespace-nowrap rounded-lg border border-ember/40 bg-void/60 " +
  "text-center font-mono text-sm tracking-wide text-mist underline underline-offset-4 " +
  "decoration-ember/60 backdrop-blur-sm transition-all duration-300 " +
  "hover:border-ember hover:text-white hover:shadow-[0_0_18px_-2px_rgba(255,106,61,0.55)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

export default function SideNav({
  progress,
  fadeOpacity,
}: {
  progress: number;
  fadeOpacity: number;
}) {
  // The fixed, drifting, scaling nav only makes sense once it has its own
  // reserved corner of the screen (desktop). Below that there's no room
  // for it to float without landing on top of the hero text, and there's
  // no reason for it to drift off-screen while parent forces it fully
  // opaque and interactive — that combination is a real bug, not just a
  // style mismatch, so mobile gets a completely different render path.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!isDesktop) {
    return (
      <nav
        aria-label="Section navigation"
        className="relative z-20 -mx-6 mt-8 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className={`${LINK_CLASS} shrink-0 px-5 py-3`}>
            {link.label}
          </a>
        ))}
      </nav>
    );
  }

  const top = lerp(NAV_POSITION.start.top, NAV_POSITION.end.top, progress);
  const right = lerp(NAV_POSITION.start.right, NAV_POSITION.end.right, progress);
  const gap = lerp(NAV_GAP_START, NAV_GAP_END, progress);
  const scale = lerp(1, 0.82, progress);
  const interactive = fadeOpacity > 0.05;

  return (
    <nav
      aria-label="Section navigation"
      style={{
        top: `${top}vh`,
        right: `${right}vw`,
        gap: `${gap}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top right",
        opacity: fadeOpacity,
        pointerEvents: interactive ? "auto" : "none",
      }}
      className="fixed z-20 flex flex-col"
    >
      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className={`${LINK_CLASS} px-6 py-3`}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}