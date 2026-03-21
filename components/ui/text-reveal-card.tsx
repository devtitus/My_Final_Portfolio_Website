"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/textRevealCard.module.css";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Use MotionValues instead of State to avoid re-renders
  const widthPercentage = useMotionValue(0);
  const left = useRef(0);
  const localWidth = useRef(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      left.current = rect.left;
      localWidth.current = rect.width;
    }
  }, []);

  // Derived transforms
  const rotateDeg = useTransform(widthPercentage, [0, 100], [-5, 5]);
  const opacity = useTransform(widthPercentage, [0, 1], [0, 1]);
  const clipPath = useTransform(widthPercentage, (val) => {
    return `inset(0 ${100 - val}% 0 0)`;
  });

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left.current;
      const percentage = Math.max(
        0,
        Math.min(100, (relativeX / localWidth.current) * 100),
      );
      widthPercentage.set(percentage);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    widthPercentage.set(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]!.clientX;
    if (cardRef.current) {
      const relativeX = clientX - left.current;
      const percentage = Math.max(
        0,
        Math.min(100, (relativeX / localWidth.current) * 100),
      );
      widthPercentage.set(percentage);
    }
  }

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[transparent] border border-none w-full h-full rounded-lg relative overflow-hidden flex flex-col justify-between",
        className,
      )}
    >
      {children}

      <div
        className={`${styles.textRevealWrapper} h-40 relative flex items-center overflow-hidden`}
      >
        <motion.div
          style={{
            width: "100%",
            opacity: isMouseOver ? 1 : 0,
            clipPath: clipPath,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-[#1d1c20] z-20  will-change-transform"
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className={`${styles.textRevealText} py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300`}
          >
            {revealText}
          </p>
        </motion.div>

        <motion.div
          style={{
            left: useTransform(widthPercentage, (val) => `${val}%`),
            rotate: rotateDeg,
            opacity: useTransform(widthPercentage, (val) => (val > 0 ? 1 : 0)),
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className={`h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform`}
        ></motion.div>

        <div
          className={`${styles.mask} overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]`}
        >
          <p
            className={`${styles.textRevealText} py-10 font-bold bg-clip-text text-transparent bg-[#323238]`}
          >
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge(`text-white mt-3 ${styles.title}`, className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge(`text-[#a9a9a9] ${styles.text}`, className)}>
      {children}
    </p>
  );
};

const Stars = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="absolute inset-0" />;
  }

  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
