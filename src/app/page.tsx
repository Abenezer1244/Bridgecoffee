"use client";

import ScrollSection from "@/components/ScrollSection";
import StoryBeat from "@/components/StoryBeat";
import HeroCTA from "@/components/HeroCTA";

export default function Home() {
  return (
    <div>
      <ScrollSection>
        {(progress: number) => (
          <>
            {/* Hero / Intro (0–15%) */}
            <StoryBeat
              progress={progress}
              progressStart={-0.05}
              progressEnd={0.15}
              alignment="center"
            >
              <div id="story" />
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-ivory tracking-tight">
                Bridge Coffee
              </h1>
              <p className="mt-4 font-serif text-xl md:text-2xl text-ivory/80">
                The living room of 122nd Street.
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-center">
                A non-profit neighborhood cafe inside North Seattle Church.
                Small-batch coffee, a big table, and room for whoever walks in.
              </p>
            </StoryBeat>

            {/* Origin Story (15–45%) */}
            <StoryBeat
              progress={progress}
              progressStart={0.15}
              progressEnd={0.45}
              alignment="left"
            >
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory tracking-tight">
                Opened in 2012.
                <br />
                <span className="text-amber">
                  Still here because you are.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed">
                We&apos;re a non-profit cafe. Every cup helps keep this room
                open, and helps fund the church&apos;s family programs
                next door.
              </p>
              <p className="mt-3 max-w-lg text-sm text-ivory/55 leading-relaxed">
                Started by neighbors who wanted a table where everyone was welcome.
              </p>
            </StoryBeat>

            {/* Craft & Precision (45–65%) */}
            <StoryBeat
              progress={progress}
              progressStart={0.45}
              progressEnd={0.65}
              alignment="right"
            >
              <div id="craft" />
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory tracking-tight">
                Coffee that earns
                <br />
                <span className="text-amber">
                  its reputation.
                </span>
              </h2>
              <div className="mt-6 space-y-3 max-w-lg">
                <p className="text-base md:text-lg leading-relaxed">
                  Herkimer-roasted beans through every espresso.
                </p>
                <p className="text-sm text-ivory/50 leading-relaxed">
                  The caramel latte has a list of regulars. The orange
                  hazelnut bun sells out before noon.
                </p>
                <p className="text-xs uppercase tracking-widest-plus text-amber/80">
                  If it doesn&apos;t taste right, it doesn&apos;t reach the counter.
                </p>
              </div>
            </StoryBeat>

            {/* Atmosphere (65–88%) */}
            <StoryBeat
              progress={progress}
              progressStart={0.65}
              progressEnd={0.88}
              alignment="center"
            >
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory tracking-tight">
                Stay as long
                <br />
                <span className="text-amber">
                  as you&apos;d like.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-center">
                Big windows, free Wi-Fi, quiet corners for working, and a
                side room where kids can play without bothering anyone.
              </p>
              <p className="mt-3 max-w-lg text-sm text-ivory/50 leading-relaxed text-center">
                Heated covered porch when it&apos;s cold. Bike rack out front.
              </p>
              <p className="mt-4 max-w-lg text-xs text-ivory/45 italic text-center">
                Devon runs the counter. He&apos;s probably why you keep coming back.
              </p>
            </StoryBeat>

            {/* Scroll hint — fades out as soon as the user starts scrolling */}
            {progress < 0.05 && (
              <div
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5"
                style={{ opacity: Math.max(0, 1 - progress / 0.05) }}
              >
                <span className="text-[11px] uppercase tracking-widest-plus text-ivory/30">Scroll</span>
                <svg
                  className="w-4 h-4 text-ivory/30 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}

            {/* CTA tease (88–100%) */}
            <StoryBeat
              progress={progress}
              progressStart={0.88}
              progressEnd={1}
              alignment="center"
            >
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory tracking-tight">
                See you this week.
              </h2>
              <p className="mt-4 font-serif text-lg md:text-xl text-ivory/60">
                8 AM to 3 PM, Monday through Friday.
              </p>
            </StoryBeat>
          </>
        )}
      </ScrollSection>

      <HeroCTA />
    </div>
  );
}
