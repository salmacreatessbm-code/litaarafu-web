"use client";

import { useState } from "react";
import type { World } from "@/data/siteContent";
import { roots, type RootWorld } from "@/data/rootsAndLessons";
import { worldStyles } from "@/lib/worlds";
import { Ar, Franco } from "@/components/Arabic";

const worldOrder: World[] = ["fusha", "egyptian", "quranic"];

function WorldColumn({ world, data }: { world: World; data: RootWorld }) {
  const style = worldStyles[world];

  return (
    <section className="card flex flex-col">
      <div className={`h-1.5 rounded-t-[7px] ${style.bar}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-5">
        <h4 className={`text-lg font-semibold ${style.text}`}>{style.label}</h4>

        <ul className="mt-3 divide-y divide-gold/50">
          {data.entries.map((entry) => (
            <li key={entry.ar + entry.franco} className="py-3">
              <Ar block sized className={`text-left text-[1.5rem] font-bold ${style.text}`}>
                {entry.ar}
              </Ar>
              <p>
                <Franco>{entry.franco}</Franco>
                {entry.reference && (
                  <span className="ml-2 text-sm">· Qur&apos;an {entry.reference}</span>
                )}
              </p>
              <p className="mt-1 text-base">{entry.meaning}</p>
              {entry.note && <p className="mt-1 text-sm">{entry.note}</p>}
            </li>
          ))}
        </ul>

        <p className="mt-auto border-t border-gold pt-4 text-base">
          <span className={`font-semibold ${style.text}`}>{data.noteLabel}: </span>
          {data.note}
        </p>
      </div>
    </section>
  );
}

export function RootExplorer() {
  const [activeId, setActiveId] = useState(roots[0].id);
  const root = roots.find((item) => item.id === activeId) ?? roots[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a root"
        className="flex flex-wrap gap-3"
      >
        {roots.map((item) => {
          const selected = item.id === root.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`root-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="root-panel"
              onClick={() => setActiveId(item.id)}
              className={`rounded-lg border px-5 py-2 text-left transition-colors ${
                selected
                  ? "border-lapis bg-lapis text-papyrus"
                  : "border-gold bg-papyrus-light text-ink hover:border-lapis"
              }`}
            >
              <Ar sized className="block text-[1.625rem] font-bold">
                {item.letters.join(" - ")}
              </Ar>
              <span className="block text-sm font-semibold" translate="no">
                {item.franco}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="root-panel"
        aria-labelledby={`root-tab-${root.id}`}
        tabIndex={0}
        className="mt-6"
      >
        <div className="mb-5">
          <h3 className="h-card">
            <Ar className="mr-2 font-bold text-lapis">{root.letters.join(" - ")}</Ar>
            <span translate="no">({root.franco})</span> · <em>{root.gloss}</em>
          </h3>
          <p className="mt-1">
            <span className="font-semibold">Core idea:</span> {root.coreIdea}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {worldOrder.map((world) => (
            <WorldColumn key={world} world={world} data={root[world]} />
          ))}
        </div>
      </div>
    </div>
  );
}
