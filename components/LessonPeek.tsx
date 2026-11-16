"use client";

import { useState } from "react";
import { homeworkExcerpt, lessonExcerpt } from "@/data/rootsAndLessons";
import { worldStyles } from "@/lib/worlds";
import { Ar, Franco, WithArabic } from "@/components/Arabic";

type TabId = "lesson" | "homework";

const tabs: { id: TabId; label: string }[] = [
  { id: "lesson", label: "Sample lesson" },
  { id: "homework", label: "Sample homework" },
];

export function LessonPeek() {
  const [active, setActive] = useState<TabId>("lesson");

  return (
    <div className="card">
      <div
        role="tablist"
        aria-label="Lesson and homework preview"
        className="flex border-b border-gold"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`peek-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`peek-panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`-mb-px border-b-[3px] px-5 py-3.5 font-semibold transition-colors ${
                selected
                  ? "border-lapis text-lapis"
                  : "border-transparent text-ink hover:text-lapis"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {active === "lesson" ? (
        <div
          role="tabpanel"
          id="peek-panel-lesson"
          aria-labelledby="peek-tab-lesson"
          tabIndex={0}
          className="p-5 md:p-8"
        >
          <h4 className="h-card">“{lessonExcerpt.title}”</h4>
          <p className="mt-1 text-base">
            {lessonExcerpt.intro} Root:{" "}
            <Ar className="font-bold text-lapis">{lessonExcerpt.rootLetters}</Ar>
          </p>

          <ol className="mt-6 grid gap-5 lg:grid-cols-3">
            {lessonExcerpt.lines.map((line) => {
              const style = worldStyles[line.world];
              return (
                <li
                  key={line.franco}
                  className={`border-t-[3px] pt-4 ${style.border}`}
                >
                  <p className={`text-sm font-semibold uppercase ${style.text}`}
                    style={{ letterSpacing: "0.1em" }}>
                    {line.setting}
                  </p>
                  <Ar block sized className={`mt-2 text-left text-[1.625rem] font-bold ${style.text}`}>
                    {line.ar}
                  </Ar>
                  <p>
                    <Franco>{line.franco}</Franco>
                  </p>
                  <p className="mt-1 text-base">{line.english}</p>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold">Say it: </span>
                    <span translate="no">{line.stress}</span>
                  </p>
                  <p className="mt-1 text-sm">{line.note}</p>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div
          role="tabpanel"
          id="peek-panel-homework"
          aria-labelledby="peek-tab-homework"
          tabIndex={0}
          className="p-5 md:p-8"
        >
          <h4 className="h-card">“{homeworkExcerpt.title}”</h4>
          <p className="mt-1 text-base">{homeworkExcerpt.intro}</p>

          <ol className="mt-6 space-y-6">
            {homeworkExcerpt.tasks.map((task, index) => (
              <li key={task.label} className="border-t border-gold pt-4">
                <p className="font-semibold text-lapis">
                  {index + 1}. {task.label}
                </p>
                <p className="mt-1 text-base">{task.prompt}</p>
                <ul className="mt-2 flex flex-wrap gap-x-10 gap-y-2">
                  {task.items.map((item) => (
                    <li key={item.ar}>
                      <Ar sized className="block text-[1.75rem] font-bold text-ink">
                        {item.ar}
                      </Ar>
                      <Franco>{item.franco}</Franco>
                    </li>
                  ))}
                </ul>
                {task.answer && (
                  <details className="mt-3">
                    <summary className="cursor-pointer font-semibold text-lapis">
                      Show answer
                    </summary>
                    <p className="mt-2 text-base">
                      <WithArabic text={task.answer} />
                    </p>
                  </details>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
