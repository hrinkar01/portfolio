"use client";

import { useEffect, useRef, useState } from "react";

// ---- Content, straight from the resume --------------------------------
// level is 1–5 and is real information (rendered as a segmented meter),
// not decoration — tune these to reflect your actual comfort with each tool.
type Skill = { name: string; level: number };
type Category = { title: string; skills: Skill[] };

const CATEGORIES: Category[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 5 },
      { name: "C", level: 3 },
      { name: "C++", level: 4 },
      { name: "Assembly", level: 3},
    ],
  },
  {
    title: "Libraries",
    skills: [
      { name: "NumPy / Pandas", level: 4 },
      { name: "Scikit-learn", level: 4 },
      { name: "Matplotlib", level: 3 },
      { name: "PyTorch", level: 3 },
      
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML ", level: 4 },
      { name: "CSS", level: 4 },
      { name: "React", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 3 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "REST API", level: 4 },
      { name: "FastAPI", level: 4 },
      { name: "Flask", level: 3 },
    ],
  },
  {
    title: "Hardware",
    skills: [
      { name: "ESP32 / ESP8266", level: 5 },
      { name: "Raspberry Pi", level: 5 },
      { name: "Arduino", level: 5 },
      { name: "Digispark", level: 5 },
    ],
  },
  {
    title: "Tools & OS",
    skills: [
      { name: "Git / GitHub", level: 4 },
      { name: "OS: MacOS, Linux (Kali, Ubuntu)", level: 5 },
      { name: "VS Code", level: 5 },
      { name: "Docker", level: 3 },
      { name: "Jupyter Notebook", level: 4 },
    ],
  },
];

const METER_SEGMENTS = 5;
// ------------------------------------------------------------------------

/** Fires `true` once the element has scrolled into view, and stays true. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function ProficiencyMeter({ level }: { level: number }) {
  return (
    <div className="flex shrink-0 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: METER_SEGMENTS }, (_, i) => (
        <span
          key={i}
          className={`h-2.5 w-[5px] rounded-[1px] ${
            i < level ? "bg-ember" : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

function Chip({
  category,
  index,
  inView,
}: {
  category: Category;
  index: number;
  inView: boolean;
}) {
  return (
    <div
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
      className={`relative transition-all duration-700 ease-out
                  ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      {/* pin stub + via dot — each chip is its own component on the board */}
      <div className="mx-auto h-6 w-px bg-gradient-to-b from-ember/70 to-ember/10" />
      <div className="mx-auto -mt-[5px] h-[8px] w-[8px] rounded-full bg-ember shadow-[0_0_8px_2px_rgba(255,106,61,0.5)]" />

      {/* chip body */}
      <div className="mt-2 h-full rounded-lg border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-ember/50">
        {/* IC pin ticks along the top edge */}
        <div className="flex justify-evenly px-4 pt-2">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="h-[3px] w-[3px] rounded-full bg-white/15" />
          ))}
        </div>

        <div className="px-5 pb-5 pt-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ember">
            {category.title}
          </h3>

          <ul className="mt-4 space-y-2.5">
            {category.skills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center justify-between gap-4 text-sm text-mist"
              >
                <span className="truncate">{skill.name}</span>
                <ProficiencyMeter level={skill.level} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function TechProficiency() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-6 pb-24 pt-10 lg:px-16"
    >
      {/* faint PCB substrate texture behind the whole section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,106,61,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="text-center">
        <h2 className="mt-3 font-mono text-3xl font-bold text-white sm:text-4xl">
          Technical Proficiency
        </h2>
      </div>

      <div
        ref={ref}
        className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CATEGORIES.map((category, i) => (
          <Chip key={category.title} category={category} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}



//layout 02
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";

// // ---- Content, straight from the resume ---------------------------------
// type Skill = { name: string; level: number };
// type Category = { key: string; title: string; skills: Skill[] };

// const CATEGORIES: Category[] = [
//   {
//     key: "languages",
//     title: "Languages",
//     skills: [
//       { name: "Python", level: 5 },
//       { name: "C++", level: 4 },
//       { name: "JavaScript", level: 4 },
//       { name: "Bash", level: 3 },
//     ],
//   },
//   {
//     key: "libraries",
//     title: "Libraries",
//     skills: [
//       { name: "NumPy / Pandas", level: 4 },
//       { name: "Scikit-learn", level: 4 },
//       { name: "Matplotlib", level: 3 },
//       { name: "TensorFlow", level: 3 },
//       { name: "PyTorch", level: 3 },
//     ],
//   },
//   {
//     key: "frontend",
//     title: "Frontend",
//     skills: [
//       { name: "React", level: 4 },
//       { name: "Next.js", level: 4 },
//       { name: "Tailwind CSS", level: 4 },
//     ],
//   },
//   {
//     key: "backend",
//     title: "Backend",
//     skills: [
//       { name: "REST API", level: 4 },
//       { name: "FastAPI", level: 4 },
//       { name: "Flask", level: 3 },
//     ],
//   },
//   {
//     key: "hardware",
//     title: "Hardware",
//     skills: [
//       { name: "ESP32 / ESP8266", level: 5 },
//       { name: "Raspberry Pi", level: 5 },
//       { name: "Arduino", level: 4 },
//       { name: "Digispark", level: 3 },
//     ],
//   },
//   {
//     key: "tools",
//     title: "Tools & OS",
//     skills: [
//       { name: "Git / GitHub", level: 4 },
//       { name: "Linux (Kali, Ubuntu)", level: 4 },
//       { name: "VS Code", level: 5 },
//       { name: "Docker", level: 3 },
//       { name: "Jupyter Notebook", level: 4 },
//     ],
//   },
// ];
// // --------------------------------------------------------------------------

// const TABS = [{ key: "all", title: "All" }, ...CATEGORIES.map((c) => ({ key: c.key, title: c.title }))];

// function useInView<T extends HTMLElement>() {
//   const ref = useRef<T>(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           io.disconnect();
//         }
//       },
//       { threshold: 0.15 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);
//   return { ref, inView };
// }

// // Small underline-tick meter — the same "underline as state" language
// // already used on the nav pills, just quantified into 5 segments.
// function LevelMeter({ level }: { level: number }) {
//   return (
//     <span className="flex items-center gap-[3px]" aria-hidden="true">
//       {Array.from({ length: 5 }, (_, i) => (
//         <span
//           key={i}
//           className={`h-[2px] w-2 rounded-full transition-colors duration-500 ${
//             i < level ? "bg-ember" : "bg-white/15"
//           }`}
//         />
//       ))}
//     </span>
//   );
// }

// function SkillPill({ skill, showCategory, index, inView }: { skill: Skill & { category?: string }; showCategory?: boolean; index: number; inView: boolean }) {
//   return (
//     <div
//       style={{ transitionDelay: inView ? `${index * 30}ms` : "0ms" }}
//       className={`flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 transition-all duration-500 ease-out hover:border-ember/40 ${
//         inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
//       }`}
//     >
//       <span className="font-mono text-sm text-white">
//         {skill.name}
//         {showCategory && skill.category && (
//           <span className="ml-2 text-xs text-mist/50">· {skill.category}</span>
//         )}
//       </span>
//       <LevelMeter level={skill.level} />
//     </div>
//   );
// }

// export default function TechProficiency() {
//   const [active, setActive] = useState("all");
//   const { ref, inView } = useInView<HTMLDivElement>();

//   const skills = useMemo(() => {
//     if (active === "all") {
//       return CATEGORIES.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.title })));
//     }
//     const cat = CATEGORIES.find((c) => c.key === active);
//     return cat ? cat.skills.map((s) => ({ ...s, category: cat.title })) : [];
//   }, [active]);

//   return (
//     <section id="skills" className="relative mx-auto w-full max-w-6xl px-6 pb-26 pt-10 lg:px-16">
//       <div className="text-center">
//         <h2 className="font-mono text-3xl font-bold text-white sm:text-4xl">
//           Technical Proficiency
//         </h2>
//         <p className="mx-auto mt-4 max-w-md text-mist">
//           The <span className="font-medium text-white">languages</span>,{" "}
//           <span className="font-medium text-white">tools</span>, and{" "}
//           <span className="font-medium text-white">hardware</span> I reach for most.
//         </p>
//       </div>

//       <div className="mt-10 flex flex-wrap justify-center gap-2.5">
//         {TABS.map((tab) => {
//           const isActive = active === tab.key;
//           return (
//             <button
//               key={tab.key}
//               type="button"
//               onClick={() => setActive(tab.key)}
//               className={`rounded-full border border-white/10 bg-black/30 px-5 py-2 font-mono text-sm transition-colors duration-200 ${
//                 isActive ? "text-white underline decoration-ember underline-offset-4" : "text-mist hover:text-white"
//               }`}
//             >
//               {tab.title}
//             </button>
//           );
//         })}
//       </div>

//       <div ref={ref} className="mt-10 flex flex-wrap justify-center gap-3">
//         {skills.map((skill, i) => (
//           <SkillPill key={`${skill.category}-${skill.name}`} skill={skill} showCategory={active === "all"} index={i} inView={inView} />
//         ))}
//       </div>
//     </section>
//   );
// }