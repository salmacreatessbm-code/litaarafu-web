import type { ReactNode } from "react";

/**
 * Every piece of Arabic on the site goes through <Ar>.
 * It guarantees lang="ar" dir="rtl", the Amiri font, line-height 2 and
 * zero letter-spacing (see the [lang="ar"] rule in app/globals.css).
 *
 * By default the text is sized 1.2x the surrounding Latin text. Pass
 * `sized` when the className sets an explicit font size.
 */
export function Ar({
  children,
  className = "",
  sized = false,
  block = false,
}: {
  children: ReactNode;
  className?: string;
  sized?: boolean;
  block?: boolean;
}) {
  const Tag = block ? "p" : "span";
  return (
    <Tag
      lang="ar"
      dir="rtl"
      className={`${sized ? "" : "ar-inline"} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}

/** Egyptian Franco-Arab transliteration (Lora italic caption). */
export function Franco({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`franco ${className}`.trim()} translate="no">
      {children}
    </span>
  );
}

const ARABIC = "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
const ARABIC_RUN = new RegExp(
  `([${ARABIC}]+(?:[ \\-]+[${ARABIC}]+)*)`,
  "g",
);

/**
 * Renders a plain string and automatically wraps every run of Arabic
 * script in <Ar>, so Arabic typed into data files or the admin forms
 * always gets lang="ar" dir="rtl" and safe line height.
 */
export function WithArabic({
  text,
  arClassName = "font-bold",
}: {
  text: string;
  arClassName?: string;
}) {
  const parts = text.split(ARABIC_RUN);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <Ar key={index} className={arClassName}>
            {part}
          </Ar>
        ) : (
          part
        ),
      )}
    </>
  );
}
