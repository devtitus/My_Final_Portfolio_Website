"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { HTMLAttributes, useState } from "react";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  showMultiplePackageOptions?: boolean;
  codeLanguage: string;
  commandMap: Record<string, string>;
  className?: string;
}

export function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  const packageManagers = Object.keys(commandMap);
  const [packageManager, setPackageManager] = useState(packageManagers[0]);
  const [copied, setCopied] = useState(false);
  const command = commandMap[packageManager];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "w-full",
          "max-lg:flex max-lg:flex-col max-lg:items-start max-lg:gap-5",
        )}
      >
        <div className="flex items-center justify-between">
          {showMultiplePackageOptions && packageManagers.length > 1 && (
            <div className="relative">
              <div
                className={cn(
                  "inline-flex overflow-hidden rounded",
                  "border border-white/[0.12] text-xs",
                )}
              >
                {packageManagers.map((pm, index) => (
                  <div key={pm} className="flex items-center ">
                    {index > 0 && (
                      <div className="h-4 w-px bg-border" aria-hidden="true" />
                    )}
                    <div
                      className={cn(
                        "relative bg-background px-2 py-1 hover:bg-background",
                        "font-primary font-normal capitalize tracking-[0.1em]",
                        "text-white/65 border-none",
                        // Responsive font size
                        "text-[clamp(12px,1.5vw,14px)]",
                        // Responsive padding
                        "px-[clamp(8px,1.5vw,12px)] py-[clamp(6px,0.5vw,8px)]",
                        packageManager === pm
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                      onClick={() => setPackageManager(pm)}
                    >
                      {pm}
                      {packageManager === pm && (
                        <motion.div
                          className="absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%] bg-primary"
                          layoutId="activeTab"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className={cn(
            "relative flex items-center",
            "lg:mt-[clamp(22px,1vw,26px)]",
          )}
        >
          <div className="flex-nowrap grow">
            <pre
              className={cn(
                "rounded-sm border border-white/[0.12] bg-transparent dark:bg-black",
                "font-primary font-normal tracking-[0.1em] text-white/70",
                "overflow-hidden",
                "shadow-[inset_0_-20px_80px_-20px_rgba(255,255,255,0.12)]",
                // Responsive padding and font size
                "p-[clamp(8px,1vw,12px)] px-[clamp(12px,1.5vw,16px)]",
                "text-[clamp(13px,1.25vw,14px)]",
                // Selection styling
                "selection:bg-brand-blue selection:text-white",
              )}
            >
              {command}
            </pre>
          </div>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "relative ml-2 rounded-sm",
              "border-[0.5px] border-white/[0.12]",
              // Responsive padding
              "p-[clamp(19px,2vw,23px)]",
            )}
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={cn(
                "w-5 h-5 aspect-square transition-all duration-300",
                copied ? "scale-0" : "scale-100",
              )}
            />
            <Check
              className={cn(
                "absolute inset-0 m-auto w-5 h-5 aspect-square transition-all duration-300",
                copied ? "scale-100" : "scale-0",
              )}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
