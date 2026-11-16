import Link from "next/link";
import { brand, footer, navLinks } from "@/data/siteContent";
import { Ar, Franco } from "@/components/Arabic";
import { BrandLogoStacked } from "@/components/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="bg-papyrus">
      <div className="mx-auto max-w-content px-4 py-14 text-center md:px-6">
        <BrandLogoStacked />

        <blockquote className="mx-auto mt-8 max-w-[46rem]">
          <Ar block sized className="text-[1.5rem] text-malachite md:text-[1.75rem]">
            {footer.verseArabic}
          </Ar>
          <p className="mt-3 italic">{footer.verseEnglish}</p>
          <footer className="mt-1 text-base">{brand.verseReference}</footer>
        </blockquote>

        <nav aria-label="Footer" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-lapis hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/dashboard" className="text-lapis hover:underline">
                Student Portal
              </Link>
            </li>
          </ul>
        </nav>

        {brand.contactEmail && (
          <p className="mt-6 text-base">
            <a href={`mailto:${brand.contactEmail}`} className="text-lapis underline">
              {brand.contactEmail}
            </a>
          </p>
        )}

        <p className="mt-8 text-base">
          <Ar className="font-bold text-lapis">{footer.signoffArabic}</Ar> ·{" "}
          <Franco>{footer.signoffFranco}</Franco> ({footer.signoffMeaning})
        </p>
        <p className="mt-2 text-sm">
          © {new Date().getFullYear()} {brand.nameLatin}. {brand.tagline}
        </p>
      </div>
    </footer>
  );
}
