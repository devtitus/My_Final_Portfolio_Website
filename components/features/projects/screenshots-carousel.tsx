"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ScreenshotsCarouselProps {
  screenshots: string[];
  title: string;
}

export function ScreenshotsCarousel({
  screenshots,
  title,
}: ScreenshotsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-3")}>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="gap-4">
          {screenshots.map((screenshot, index) => (
            <CarouselItem key={index} className="flex-shrink-0 w-full">
              <div
                className={cn(
                  "relative w-full aspect-video rounded-lg overflow-hidden",
                  "border border-[var(--glass-border-color)]",
                  "bg-white/5",
                )}
              >
                <Image
                  src={screenshot}
                  alt={`${title} image ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 900px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {screenshots.length > 1 && (
          <>
            <CarouselPrevious
              className={cn(
                "left-2 sm:left-4",
                "rounded-full border border-[var(--glass-border-color)]",
                "bg-muted/80 hover:bg-primary hover:border-primary",
                "transition-all duration-200",
                "w-[clamp(32px,3vw,44px)] h-[clamp(32px,3vw,44px)]",
                "max-sm:w-9 max-sm:h-9",
              )}
            />
            <CarouselNext
              className={cn(
                "right-2 sm:right-4",
                "rounded-full border border-[var(--glass-border-color)]",
                "bg-muted/80 hover:bg-primary hover:border-primary",
                "transition-all duration-200",
                "w-[clamp(32px,3vw,44px)] h-[clamp(32px,3vw,44px)]",
                "max-sm:w-9 max-sm:h-9",
              )}
            />
          </>
        )}
      </Carousel>

      {/* Slide counter/indicators */}
      {screenshots.length > 1 && (
        <div className="flex items-center justify-between px-1">
          <div className="flex gap-1.5">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 rounded-full transition-all duration-200",
                  index === current - 1
                    ? "w-6 bg-primary"
                    : "bg-white/20 flex-1",
                )}
              />
            ))}
          </div>
          <span className="text-[12px] text-[var(--skill-text-color)] font-secondary">
            {current} / {count}
          </span>
        </div>
      )}
    </div>
  );
}
