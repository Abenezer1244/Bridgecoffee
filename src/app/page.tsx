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
              progressStart={0}
              progressEnd={0.15}
              alignment="center"
            >
              <div id="story" />
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-ivory to-amber tracking-tight">
                Bridge Coffee
              </h1>
              <p className="mt-4 font-serif text-xl md:text-2xl text-ivory/80">
                Craft, poured with intention.
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-center">
                Artisan coffee roasted locally and served with purpose — for
                mornings worth savoring.
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
                Born from the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light">
                  perfect bean.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed">
                We source single-origin beans from family farms, roasted in small
                batches to unlock every note of flavor.
              </p>
              <p className="mt-3 max-w-lg text-sm text-ivory/40 leading-relaxed">
                The journey from seed to cup is one we take seriously.
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
                Precision is
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light">
                  our process.
                </span>
              </h2>
              <div className="mt-6 space-y-3 max-w-lg">
                <p className="text-base md:text-lg leading-relaxed">
                  Grind size, water temperature, extraction time — every variable
                  dialed in.
                </p>
                <p className="text-sm text-ivory/50 leading-relaxed">
                  Our baristas are craftspeople. Your espresso, their masterpiece.
                </p>
                <p className="text-xs uppercase tracking-widest-plus text-amber/60">
                  No shortcuts. No compromises. Just coffee done right.
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
                A space that
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-light">
                  breathes.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-center">
                Whether you stay for an hour or just a moment — this is your
                place.
              </p>
              <p className="mt-3 max-w-lg text-sm text-ivory/50 leading-relaxed text-center">
                Big windows. Natural light. Local art on the walls. Music that
                sets the mood.
              </p>
              <p className="mt-4 max-w-lg text-xs text-ivory/30 italic text-center">
                A neighborhood coffee shop trying to brighten everyone&apos;s day,
                one cup at a time.
              </p>
            </StoryBeat>

            {/* CTA tease (88–100%) */}
            <StoryBeat
              progress={progress}
              progressStart={0.88}
              progressEnd={1}
              alignment="center"
            >
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-ivory to-amber tracking-tight">
                Drink something real.
              </h2>
              <p className="mt-4 font-serif text-lg md:text-xl text-ivory/60">
                Scroll down
              </p>
            </StoryBeat>
          </>
        )}
      </ScrollSection>

      <HeroCTA />
    </div>
  );
}
