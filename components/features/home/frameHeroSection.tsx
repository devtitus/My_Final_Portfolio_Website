"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/magicui/aurora-text";
import { CopyIcon } from "@/lib/utils/icons";
import Image from "next/image";
import Link from "next/link";

const FRAME_COUNT = 192;
const FRAME_PATH = "/macbook-webp/ezgif-frame-";
const FRAME_EXT = ".webp";
const INITIAL_BATCH_SIZE = 10; // Load first 10 frames immediately
const BATCH_SIZE = 30; // Load subsequent frames in batches

const FrameHeroSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const email = "m.works.gd@gmail.com";
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null),
  );
  const [loadProgress, setLoadProgress] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const loadedCountRef = useRef(0);
  const isLoadingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);

  // Load a batch of images
  const loadImageBatch = useCallback(
    (startIndex: number, endIndex: number): Promise<void[]> => {
      const promises: Promise<void>[] = [];

      for (let i = startIndex; i <= endIndex && i <= FRAME_COUNT; i++) {
        if (imagesRef.current[i - 1]) continue; // Already loaded

        const img = new window.Image();
        const promise = new Promise<void>((resolve) => {
          img.onload = () => {
            imagesRef.current[i - 1] = img;
            loadedCountRef.current++;
            setLoadProgress((loadedCountRef.current / FRAME_COUNT) * 100);
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${i}`);
            resolve(); // Don't block on failures
          };
        });
        img.src = `${FRAME_PATH}${i.toString().padStart(3, "0")}${FRAME_EXT}`;
        promises.push(promise);
      }

      return Promise.all(promises);
    },
    [],
  );

  // Progressive image loading
  useEffect(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    const loadProgressively = async () => {
      // Priority 1: Load first batch immediately for initial display
      await loadImageBatch(1, INITIAL_BATCH_SIZE);
      setIsInitialLoaded(true);

      // Priority 2: Load remaining frames in batches
      for (
        let start = INITIAL_BATCH_SIZE + 1;
        start <= FRAME_COUNT;
        start += BATCH_SIZE
      ) {
        const end = Math.min(start + BATCH_SIZE - 1, FRAME_COUNT);
        await loadImageBatch(start, end);
      }
    };

    loadProgressively();
  }, [loadImageBatch]);

  // Optimized scroll handler with rAF throttling
  useEffect(() => {
    if (!isInitialLoaded || !canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    // Set canvas size
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(dpr, dpr);
    };

    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];

      // Fallback: find nearest loaded frame
      let actualImg = img;
      if (!actualImg) {
        for (let offset = 1; offset <= 10; offset++) {
          actualImg =
            imagesRef.current[frameIndex - offset] ||
            imagesRef.current[frameIndex + offset];
          if (actualImg) break;
        }
      }

      if (actualImg) {
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;

        const hRatio = displayWidth / actualImg.width;
        const vRatio = displayHeight / actualImg.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (displayWidth - actualImg.width * ratio) / 2;
        const centerShift_y = (displayHeight - actualImg.height * ratio) / 2;

        context.clearRect(0, 0, displayWidth, displayHeight);
        context.drawImage(
          actualImg,
          0,
          0,
          actualImg.width,
          actualImg.height,
          centerShift_x,
          centerShift_y,
          actualImg.width * ratio,
          actualImg.height * ratio,
        );
      }
    };

    const updateFrame = () => {
      const sectionHeight = sectionRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      const maxScroll = sectionHeight - windowHeight;

      if (maxScroll <= 0) return;

      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const frameIndex = Math.min(
        Math.floor(progress * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1,
      );

      // Only redraw if frame changed
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    // Throttled scroll handler using rAF
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateFrame();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttled resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateSize();
        drawFrame(currentFrameRef.current);
      }, 100);
    };

    updateSize();
    drawFrame(0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isInitialLoaded]);

  // Email Copy Handle Function
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [email]);

  return (
    <div
      ref={sectionRef}
      className={cn("relative w-full")}
      style={{ height: "500vh" }}
    >
      <div
        className={cn(
          "sticky top-0 w-full h-svh min-h-[600px] overflow-hidden",
          "max-sm:h-svh max-sm:min-h-[500px]",
        )}
      >
        {/* Loading Progress Bar */}
        {loadProgress < 100 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-50">
            <div
              className="h-full bg-brand-blue transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute top-0 left-0 w-full h-full object-contain aspect-[16/9] z-[1] mt-[64px] lg:mt-[0px]",
            "brightness-[0.7] contrast-[1.1] transition-[filter] duration-300",
            "max-lg:brightness-[0.6] max-lg:contrast-[1.15]",
            "max-sm:brightness-[0.5]",
            !isInitialLoaded && "opacity-0",
          )}
        />

        {/* Overlay */}
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full z-10",
            "flex flex-col justify-center items-center pointer-events-none",
            "bg-gradient-to-br from-black/40 via-black/20 to-brand-blue/10",
            // Glassmorphic backdrop
            "after:content-[''] after:absolute after:inset-0",
            "after:backdrop-blur-[0.5px] after:pointer-events-none",
          )}
        >
          <div className="pointer-events-auto w-full h-full flex flex-col justify-center items-center relative z-[11]">
            <div
              className={cn(
                "flex flex-col items-start gap-4 z-10 relative pl-4 md:pl-[clamp(24px,4vw,60px)] 2xl:pl-0 w-full max-w-[1920px] mx-auto",
                "max-sm:items-center max-sm:pl-0 max-sm:px-4 max-sm:gap-8 max-w-[1400px]",
              )}
            >
              {/* Hero Heading */}
              <h1
                className={cn(
                  "flex flex-col text-white text-left font-primary",
                  "text-[clamp(20px,3.25vw,44px)] font-semibold leading-[1.4] tracking-tight",
                  "drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
                  "animate-fade-in-up motion-reduce:animate-none",
                  "max-lg:text-[clamp(20px,3.25vw,44px)]",
                  "max-sm:text-[clamp(28px,6vw,32px)] max-sm:text-center",
                )}
              >
                <span className="inline-block">
                  Transforming complex challenges{" "}
                </span>
                <span className="inline-block">
                  into elegant{" "}
                  <AuroraText
                    colors={["#0057E0", "#F3F4F6", "#0057E0", "#0057E0"]}
                    speed={1.5}
                    className={cn(
                      "font-primary font-bold capitalize",
                      "text-[clamp(20px,3.25vw,44px)]",
                      "max-lg:text-[clamp(20px,3.25vw,44px)]",
                      "max-sm:text-[clamp(30px,6vw,32px)]",
                    )}
                  >
                    Solutions
                  </AuroraText>
                </span>
              </h1>

              {/* Hero Description */}
              <div className="flex flex-row items-center gap-3 max-sm:flex max-sm:flex-col">
                <span
                  className={cn(
                    "text-left font-secondary text-[clamp(16px,1.5vw,20px)] font-normal",
                    "text-white/85 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
                    "animate-fade-in-up motion-reduce:animate-none",
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  Hello, I&apos;m Melwyn Titus
                </span>
                <div className="w-[80px] h-[40px] rounded-[40px] flex items-center justify-center border border-white/20 relative overflow-hidden group cursor-pointer backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="absolute top-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent transform translate-y-0 duration-500 ease-in-out group-hover:-translate-y-full z-[4]"></div>
                  <Image
                    src="/home/hi.png"
                    alt="Welcome Icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 origin-[70%_70%] animate-wave z-[5] drop-shadow-lg"
                  />
                </div>
                <span
                  className={cn(
                    "text-left font-secondary text-[clamp(16px,1.5vw,20px)] font-normal",
                    "text-white/85 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
                    "animate-fade-in-up motion-reduce:animate-none",
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  a Full Stack Developer & Product Engineer
                </span>
              </div>

              {/* Hero Buttons */}
              <div
                className={cn(
                  "flex items-center gap-10 mt-8",
                  "max-lg:flex-col-reverse max-lg:gap-7",
                  "max-sm:flex-col max-sm:gap-5 max-sm:w-full",
                )}
              >
                <Link href="/projects" className="w-full max-sm:max-w-[280px]">
                  <button
                    className={cn(
                      "group relative flex justify-center items-center w-full",
                      "px-6 py-3 bg-white text-[#08080a] text-base font-normal rounded-[8px]",
                      "overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                      "shadow-[0_0_0_1px_rgba(0,87,224,0.3),0_8px_24px_rgba(0,87,224,0.2)]",
                      "hover:shadow-[0_0_0_1px_rgba(0,87,224,0.5),0_12px_32px_rgba(0,87,224,0.3)]",
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0057E0]/10 via-transparent to-[#0057E0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 tracking-wide">
                      Explore Projects
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0057E0] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </button>
                </Link>
                <div className="flex flex-row items-center gap-3 group max-sm:hidden">
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-110 active:scale-95"
                    onClick={handleCopyEmail}
                    title={isCopied ? "Copied!" : "Copy email to clipboard"}
                  >
                    <CopyIcon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </button>
                  <span className="text-white/80 text-[clamp(14px,1.1vw,16px)] font-secondary font-normal tracking-wide group-hover:text-white/90 transition-colors">
                    {isCopied ? "Copied!" : email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 z-20",
            "text-white/60 text-xs uppercase tracking-[4px] font-normal",
            "flex flex-col items-center gap-3 animate-pulse-glow",
            "motion-reduce:animate-none",
            // Line after
            "after:content-[''] after:w-px after:h-[30px]",
            "after:bg-gradient-to-b after:from-brand-blue/80 after:to-transparent",
            "after:animate-scroll-line",
            "motion-reduce:after:animate-none",
            // Hide on mobile
            "max-sm:hidden",
          )}
        >
          Scroll to animate
        </div>
      </div>
    </div>
  );
};

export default FrameHeroSection;
