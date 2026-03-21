"use client";
import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/magicui/aurora-text";
import { CopyIcon } from "@/lib/utils/icons";
import Image from "next/image";
import Link from "next/link";
import { StarsBackground } from "@/components/ui/stars";

const PerformanceHeroSection = () => {
    const [isCopied, setIsCopied] = useState(false);
    const email = "m.works.gd@gmail.com";

    const handleCopyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            const textArea = document.createElement("textarea");
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, [email]);

    return (
        <div className="relative w-full h-svh min-h-[600px] overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <StarsBackground
                    className="w-full h-full absolute inset-0"
                    speed={0.5}
                    starDensity={0.0002}
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center pointer-events-none">
                <div className="pointer-events-auto w-full h-full flex flex-col justify-center items-center relative z-[11]">
                    <div
                        className={cn(
                            "flex flex-col items-start gap-5 z-10 relative",
                            "pl-4 md:pl-[clamp(24px,4vw,60px)] 2xl:pl-0",
                            "w-full max-w-[1400px] mx-auto",
                            "max-sm:items-center max-sm:pl-0 max-sm:px-5",
                        )}
                    >
                        {/* Availability Badge */}
                        <div
                            className={cn(
                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                                "bg-white/[0.04] border border-white/[0.10]",
                                "backdrop-blur-sm",
                                "animate-fade-in-up motion-reduce:animate-none",
                            )}
                            style={{ animationDelay: "0s" }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-white/70 font-secondary text-[clamp(12px,1vw,13px)] font-medium tracking-wide">
                                Open to opportunities
                            </span>
                        </div>

                        {/* Hero Heading */}
                        <h1
                            className={cn(
                                "flex flex-col text-white text-left font-primary",
                                "text-[clamp(20px,3.25vw,44px)] font-semibold leading-[1.4] tracking-tight",
                                "drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
                                "animate-fade-in-up motion-reduce:animate-none",
                                "max-sm:text-[clamp(28px,6vw,32px)] max-sm:text-center",
                            )}
                            style={{ animationDelay: "0.1s" }}
                        >
                            <span className="inline-block">
                                Transforming complex challenges
                            </span>
                            <span className="inline-block">
                                into elegant{" "}
                                <AuroraText
                                    colors={["#0057E0", "#F3F4F6", "#0057E0", "#0057E0"]}
                                    speed={1.5}
                                    className={cn(
                                        "font-primary font-bold capitalize",
                                        "text-[clamp(20px,3.25vw,44px)]",
                                        "max-sm:text-[clamp(30px,6vw,32px)]",
                                    )}
                                >
                                    Solutions
                                </AuroraText>
                            </span>
                        </h1>

                        {/* Hero Intro — two clean lines, no mid-sentence wrapping */}
                        <div
                            className={cn(
                                "flex flex-col gap-1",
                                "animate-fade-in-up motion-reduce:animate-none",
                                "max-sm:items-center",
                            )}
                            style={{ animationDelay: "0.2s" }}
                        >
                            <div className="flex flex-row items-center gap-2.5 max-sm:justify-center">
                                <span
                                    className={cn(
                                        "font-secondary text-[clamp(16px,1.5vw,20px)] font-normal",
                                        "text-white/85 tracking-wide",
                                    )}
                                >
                                    Hello, I&apos;m Melwyn Titus
                                </span>
                                <div className="w-[52px] h-[28px] rounded-[40px] flex items-center justify-center border border-white/20 relative overflow-hidden group cursor-pointer backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 shrink-0">
                                    <div className="absolute top-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent transform translate-y-0 duration-500 ease-in-out group-hover:-translate-y-full z-[4]" />
                                    <Image
                                        src="/home/hi.png"
                                        alt="Wave"
                                        width={24}
                                        height={24}
                                        sizes="24px"
                                        className="w-6 h-6 origin-[70%_70%] animate-wave z-[5] drop-shadow-lg"
                                    />
                                </div>
                            </div>
                            <span
                                className={cn(
                                    "font-secondary text-[clamp(16px,1.5vw,20px)] font-normal",
                                    "text-white/60 tracking-wide",
                                    "max-sm:text-center",
                                )}
                            >
                                Full Stack Developer &amp; Product Engineer
                            </span>
                        </div>

                        {/* Hero CTAs — primary always on top/left, email below */}
                        <div
                            className={cn(
                                "flex flex-col gap-4 mt-4",
                                "max-sm:w-full max-sm:items-center",
                                "sm:flex-row sm:items-center sm:gap-8",
                            )}
                            style={{ animationDelay: "0.3s" }}
                        >
                            <Link href="/projects" className="max-sm:w-full max-sm:max-w-[280px]">
                                <button
                                    className={cn(
                                        "group relative flex justify-center items-center w-full",
                                        "px-6 py-3 bg-white text-[#08080a] text-base font-normal rounded-[8px]",
                                        "overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                                        "shadow-[0_0_0_1px_rgba(0,87,224,0.3),0_8px_24px_rgba(0,87,224,0.2)]",
                                        "hover:shadow-[0_0_0_1px_rgba(0,87,224,0.5),0_12px_32px_rgba(0,87,224,0.3)]",
                                    )}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0057E0]/10 via-transparent to-[#0057E0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 tracking-wide">Explore Projects</span>
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0057E0] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                </button>
                            </Link>

                            {/* Email copy — visible on all viewports */}
                            <button
                                className="flex flex-row items-center gap-3 group"
                                onClick={handleCopyEmail}
                                title={isCopied ? "Copied!" : "Copy email to clipboard"}
                                aria-label={isCopied ? "Email copied" : "Copy email address"}
                            >
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-110 active:scale-95 shrink-0">
                                    <CopyIcon className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                                </span>
                                <span className="text-white/70 text-[clamp(14px,1.1vw,16px)] font-secondary font-normal tracking-wide group-hover:text-white/90 transition-colors">
                                    {isCopied ? "Copied!" : email}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className={cn(
                    "absolute bottom-8 left-0 right-0 z-20",
                    "flex flex-col items-center gap-1.5",
                    "animate-fade-in-up motion-reduce:animate-none",
                )}
                style={{ animationDelay: "0.8s" }}
                aria-hidden="true"
            >
                <span className="text-white/30 font-secondary text-[11px] tracking-[0.15em] uppercase">
                    scroll
                </span>
                <div className="w-px h-8 relative overflow-hidden rounded-full bg-white/10">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0057E0] to-transparent animate-scroll-line" />
                </div>
            </div>
        </div>
    );
};

export default PerformanceHeroSection;
