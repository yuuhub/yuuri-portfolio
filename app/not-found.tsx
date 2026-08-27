import Link from "next/link";
import { DoodleUnderline } from "@/components/doodles";

export default function NotFound() {
  return (
    <main className="relative min-h-[100vh] flex items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-[560px]">
        <span className="hand-note text-[30px] inline-block -rotate-2">
          oops, this page went missing
        </span>
        <h1 className="text-[clamp(48px,10vw,88px)] font-semibold leading-[1.05] mt-4">
          404
        </h1>
        <p className="mt-4 text-[18px] text-[var(--ink-soft)]">
          The page you are looking for was either moved, renamed, or never
          existed in the first place.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-stamp primary">
            Back to the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
