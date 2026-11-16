"use client";

import { useState } from "react";
import { flashcards } from "@/data/rootsAndLessons";
import { worldStyles } from "@/lib/worlds";
import { Ar, Franco } from "@/components/Arabic";

export function FlashcardDeck() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {flashcards.map((card) => {
        const isFlipped = Boolean(flipped[card.id]);
        const style = worldStyles[card.world];

        return (
          <li key={card.id} className="flip-scene">
            <button
              type="button"
              aria-pressed={isFlipped}
              aria-label={
                isFlipped
                  ? `${card.franco}: ${card.meaning}. Tap to see the Arabic again.`
                  : `Flashcard: ${card.franco}. Tap to see the meaning.`
              }
              onClick={() =>
                setFlipped((state) => ({ ...state, [card.id]: !state[card.id] }))
              }
              className="block h-[19rem] w-full text-center"
            >
              <span
                className={`flip-inner relative block h-full w-full ${
                  isFlipped ? "is-flipped" : ""
                }`}
              >
                {/* Front: Arabic + tashkeel + Franco-Arab */}
                <span
                  aria-hidden={isFlipped}
                  className="flip-face card absolute inset-0 flex flex-col items-center justify-center p-5"
                >
                  <span className={`badge ${style.badge}`}>{style.shortLabel}</span>
                  <Ar sized className={`mt-3 block text-[2.25rem] font-bold ${style.text}`}>
                    {card.ar}
                  </Ar>
                  <Franco className="!text-base">{card.franco}</Franco>
                  <span className="mt-3 text-sm">
                    Root: <Ar className="font-bold">{card.rootLetters}</Ar>
                  </span>
                  <span className="mt-auto text-sm font-semibold text-lapis">
                    Tap to flip ↻
                  </span>
                </span>

                {/* Back: plain-English meaning + cultural tip */}
                <span
                  aria-hidden={!isFlipped}
                  className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-gold bg-lapis p-5 text-papyrus"
                >
                  <span className="text-xl font-semibold md:text-2xl">
                    {card.meaning}
                  </span>
                  <span className="mx-auto my-3 block h-px w-16 bg-gold" />
                  <span className="text-base">{card.tip}</span>
                  <span className="mt-auto text-sm font-semibold">Tap to flip back ↻</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
