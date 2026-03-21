"use client";

import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { Command } from "cmdk";
import {
  HomeIcon,
  SearchIcon,
  AboutIcon,
  ProjectsIcon,
  ContactIcon,
  CopyIcon,
  LinkedInIcon,
  LinkIcon,
  GithubIcon,
} from "@/lib/utils/icons";
import { cn } from "@/lib/utils";

interface CommandItemProps {
  value: string;
  onSelect?: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
  shortcut?: React.ReactNode;
}

const CommandItem = memo(function CommandItem({
  value,
  onSelect,
  icon,
  label,
  description,
  shortcut,
}: CommandItemProps) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="group relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none data-[selected=true]:bg-white/10 data-[selected=true]:text-white transition-colors"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/5 bg-white/5 text-white/50 group-data-[selected=true]:text-white group-data-[selected=true]:border-white/20 group-data-[selected=true]:bg-white/10 transition-colors">
        {icon}
      </div>
      <div className="ml-3 flex flex-col justify-center">
        <span className="text-[14px] font-medium text-white/80 group-data-[selected=true]:text-white font-secondary">
          {label}
        </span>
        <span className="text-[12px] text-white/40 group-data-[selected=true]:text-white/60 font-secondary">
          {description}
        </span>
      </div>
      {shortcut && (
        <div className="ml-auto flex items-center gap-1">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-white/5 text-white/50 group-data-[selected=true]:text-white/70">
            {shortcut}
          </div>
        </div>
      )}
    </Command.Item>
  );
});

interface CommandMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

/**
 * CommandMenu — pre-mounted for zero open latency.
 *
 * The key perf fix: this component is ALWAYS in the DOM (never unmounted).
 * When closed, it is hidden with CSS (opacity 0, pointer-events-none, visibility hidden).
 * Opening costs only a CSS transition — no React mount, no cmdk init, no ARIA setup.
 */
const CommandMenu = memo(function CommandMenu({
  isOpen,
  setIsOpen,
  onNavigate,
}: CommandMenuProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch("");
  }, [setIsOpen]);

  // Focus the input whenever the menu opens — replaces autoFocus
  useEffect(() => {
    if (isOpen) {
      // Pause Lenis so its rAF loop doesn't compete with the open animation
      const lenis = (window as any).lenis;
      lenis?.stop();

      // Defer focus by one frame so the CSS transition has started
      const id = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    } else {
      // Resume Lenis when menu closes
      const lenis = (window as any).lenis;
      lenis?.start();
    }
  }, [isOpen]);

  // Click outside — only active when open
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Element)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, { capture: true });
    return () => document.removeEventListener("mousedown", handleClickOutside, { capture: true });
  }, [isOpen, handleClose]);

  // Keyboard shortcuts — always active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        handleClose();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, setIsOpen]);

  const handleSelect = useCallback(
    (value: string) => {
      switch (value) {
        case "home":
        case "about":
        case "projects":
        case "contact":
          onNavigate(value);
          break;
        case "copy-email":
          navigator.clipboard.writeText("m.works.gd@gmail.com");
          break;
        case "linkedin":
          window.open("https://www.linkedin.com/in/melwyn-john-8125bb214", "_blank");
          break;
        case "github":
          window.open("https://github.com/devtitus", "_blank");
          break;
      }
      handleClose();
    },
    [onNavigate, handleClose]
  );

  const handleSelectHome = useCallback(() => handleSelect("home"), [handleSelect]);
  const handleSelectAbout = useCallback(() => handleSelect("about"), [handleSelect]);
  const handleSelectProjects = useCallback(() => handleSelect("projects"), [handleSelect]);
  const handleSelectCopyEmail = useCallback(() => handleSelect("copy-email"), [handleSelect]);
  const handleSelectContact = useCallback(() => handleSelect("contact"), [handleSelect]);
  const handleSelectLinkedIn = useCallback(() => handleSelect("linkedin"), [handleSelect]);
  const handleSelectGithub = useCallback(() => handleSelect("github"), [handleSelect]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    // Outer shell — always in DOM, hidden with CSS when closed
    <div
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 sm:p-0",
        "transition-opacity duration-150",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65"
        onClick={handleClose}
      />

      {/* Content wrapper */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-50 w-full max-w-2xl",
          "transition-transform duration-150 ease-out",
          isOpen ? "translate-y-0" : "translate-y-2"
        )}
      >
        {/* Glow */}
        <div
          className="absolute -inset-4 -z-10 rounded-xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0, 87, 224, 0.2) 0%, rgba(0, 87, 224, 0.06) 40%, transparent 70%)",
          }}
        />

        {/* Panel */}
        <div className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-[#0a0a0f] shadow-[0_24px_48px_rgba(0,0,0,0.7)]">
          <Command
            className="h-full w-full overflow-hidden bg-transparent"
            shouldFilter={true}
          >
            {/* Input */}
            <div className="flex items-center border-b border-white/10 px-4">
              <SearchIcon className="mr-3 h-5 w-5 shrink-0 text-white/50" />
              <Command.Input
                ref={inputRef}
                value={search}
                onValueChange={handleSearchChange}
                placeholder="Type a command or search..."
                className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-white/50 text-white font-secondary"
              />
              <button
                className="ml-2 hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-white/20 bg-white/5 px-2 text-[10px] font-medium text-white/70 hover:bg-white/10 transition-colors"
                onClick={handleClose}
                type="button"
              >
                ESC
              </button>
            </div>

            {/* List */}
            <Command.List data-lenis-prevent className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-2">
              <Command.Empty className="py-6 text-center text-sm text-white/50 font-secondary">
                No results found.
              </Command.Empty>

              <Command.Group
                heading="Pages"
                className="text-white/50 px-2 py-1.5 text-xs font-medium font-secondary uppercase tracking-wider [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                <CommandItem value="home" onSelect={handleSelectHome} icon={<HomeIcon className="h-5 w-5" />} label="Home" description="Go to the home page" />
                <CommandItem value="about" onSelect={handleSelectAbout} icon={<AboutIcon className="h-5 w-5" />} label="About" description="Learn more about me" />
                <CommandItem value="projects" onSelect={handleSelectProjects} icon={<ProjectsIcon className="h-5 w-5" />} label="Projects" description="View my projects" />
              </Command.Group>

              <Command.Group
                heading="Actions"
                className="text-white/50 px-2 py-1.5 text-xs font-medium font-secondary uppercase tracking-wider"
              >
                <CommandItem value="copy-email" onSelect={handleSelectCopyEmail} icon={<CopyIcon className="h-5 w-5" />} label="Copy Email" description="Copy my email to clipboard" />
                <CommandItem value="contact" onSelect={handleSelectContact} icon={<ContactIcon className="h-5 w-5" />} label="Contact" description="Get in touch with me" />
              </Command.Group>

              <Command.Group
                heading="Socials"
                className="text-white/50 px-2 py-1.5 text-xs font-medium font-secondary uppercase tracking-wider"
              >
                <CommandItem value="linkedin" onSelect={handleSelectLinkedIn} icon={<LinkedInIcon className="h-5 w-5" />} label="LinkedIn" description="Connect with me on LinkedIn" shortcut={<LinkIcon className="h-3 w-3" />} />
                <CommandItem value="github" onSelect={handleSelectGithub} icon={<GithubIcon className="h-5 w-5" />} label="Github" description="Connect with me on Github" shortcut={<LinkIcon className="h-3 w-3" />} />
              </Command.Group>
            </Command.List>

            {/* Footer */}
            <div className="hidden sm:flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-4">
                <LinkedInIcon
                  className="h-4 w-4 text-white/60 hover:text-white transition-colors cursor-pointer"
                  onClick={() => window.open("https://www.linkedin.com/in/melwyn-john-8125bb214", "_blank")}
                />
                <GithubIcon
                  className="h-4 w-4 text-white/60 hover:text-white transition-colors cursor-pointer"
                  onClick={() => window.open("https://github.com/devtitus", "_blank")}
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-white/60 font-secondary">
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 text-[10px] font-medium">↑</span>
                  <span className="flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 text-[10px] font-medium">↓</span>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 text-[10px] font-medium">↵</span>
                  <span>select</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center justify-center px-1.5 h-5 rounded border border-white/20 bg-white/5 text-[10px] font-medium">esc</span>
                  <span>close</span>
                </div>
              </div>
            </div>
          </Command>
        </div>
      </div>
    </div>
  );
});

export default CommandMenu;
