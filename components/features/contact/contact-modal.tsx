"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Send } from "lucide-react";
import { PrimaryButton } from "@/components/ui";

interface ContactModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

import { submitContactForm } from "@/app/actions/submitContact";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // State for form submission
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await submitContactForm(null, formData);
      if (result.success) {
        setMessage({
          text: result.message || "Message sent successfully!",
          type: "success",
        });
        // Reset form or close modal after a delay
        setTimeout(() => {
          onClose(false);
          setMessage(null);
        }, 2000);
      } else {
        setMessage({
          text: result.message || "Something went wrong.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-[radial-gradient(ellipse_at_center,rgba(0,87,224,0.12)_0%,rgba(0,87,224,0.04)_30%,rgba(10,10,15,0.98)_100%)]",
          "border border-[var(--glass-border-color)]",
          "text-foreground max-w-[90vw] w-[1000px]",
          "h-[85vh] max-h-[85vh] max-sm:h-[92svh] max-sm:max-h-[92svh]",
          "overflow-hidden flex flex-col p-0 rounded-2xl",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] border-none gap-0",
          "sm:max-w-[1000px]",
          "mt-[48px] lg:mt-[60px]",
        )}
      >
        <div
          data-lenis-prevent
          className={cn(
            "overflow-y-auto flex-1",
            "py-[clamp(32px,4vw,40px)] px-[clamp(20px,4vw,40px)]",
            "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb:hover]:bg-white/20",
          )}
        >
          <DialogHeader
            className={cn(
              "flex justify-between items-start",
              "mb-[clamp(24px,4vw,32px)]",
              "max-sm:flex-col max-sm:gap-2",
            )}
          >
            <div className="flex flex-col gap-2">
              <DialogTitle className="font-secondary text-[clamp(20px,3vw,30px)] text-left leading-tight text-foreground">
                Get In Touch
              </DialogTitle>
              <span className="font-secondary text-[var(--skill-text-color)] text-left text-[clamp(14px,2vw,16px)] mb-[clamp(4px,1vw,8px)]">
                Have a project in mind? Let's talk.
              </span>
            </div>
          </DialogHeader>

          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-[1fr_1.5fr]",
              "gap-[clamp(24px,4vw,40px)]",
            )}
          >
            {/* Left Column: Info */}
            <div className="flex flex-col gap-6">
              <div
                className={cn(
                  "bg-[var(--glass-color)] border border-[var(--glass-border-color)]",
                  "rounded-xl p-[clamp(20px,3vw,32px)] flex flex-col gap-6",
                )}
              >
                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-2 text-[clamp(14px,1.8vw,16px)] font-medium font-secondary text-foreground">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    Email
                  </h4>
                  <a
                    href="mailto:hello@example.com"
                    className="text-[var(--skill-text-color)] hover:text-primary transition-colors font-secondary text-[clamp(14px,2vw,16px)]"
                  >
                    m.works.gd@gmail.com
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-2 text-[clamp(14px,1.8vw,16px)] font-medium font-secondary text-foreground">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    Location
                  </h4>
                  <p className="text-[var(--skill-text-color)] font-secondary text-[clamp(14px,2vw,16px)]">
                    Available Worldwide (Remote)
                  </p>
                </div>
              </div>

              <div className="text-[var(--skill-text-color)] font-secondary text-[clamp(13px,1.7vw,15px)] leading-relaxed italic opacity-80">
                "Great design is a relationship between form and function."
              </div>
            </div>

            {/* Right Column: Form */}
            <div
              className={cn(
                "bg-[var(--glass-color)] border border-[var(--glass-border-color)]",
                "rounded-xl p-[clamp(20px,3vw,32px)]",
              )}
            >
              <form className="flex flex-col gap-6" action={handleSubmit}>
                {message && (
                  <div
                    className={cn(
                      "p-3 rounded-lg text-[clamp(13px,1.6vw,15px)] font-medium",
                      message.type === "success"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500",
                    )}
                  >
                    {message.text}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[clamp(14px,1.7vw,15px)] font-medium font-secondary text-[var(--skill-text-color)]">
                      Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      className="bg-black/20 border-white/10 text-foreground placeholder:text-white/20 focus-visible:ring-primary/50"
                      required
                      name="name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[clamp(14px,1.7vw,15px)] font-medium font-secondary text-[var(--skill-text-color)]">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-black/20 border-white/10 text-foreground placeholder:text-white/20 focus-visible:ring-primary/50"
                      required
                      name="email"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[clamp(14px,1.7vw,15px)] font-medium font-secondary text-[var(--skill-text-color)]">
                    Subject
                  </label>
                  <Input
                    placeholder="Project Inquiry..."
                    className="bg-black/20 border-white/10 text-foreground placeholder:text-white/20 focus-visible:ring-primary/50"
                    required
                    name="subject"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[clamp(14px,1.7vw,15px)] font-medium font-secondary text-[var(--skill-text-color)]">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    className="bg-black/20 border-white/10 text-foreground placeholder:text-white/20 min-h-[150px] resize-none focus-visible:ring-primary/50"
                    required
                    name="message"
                    disabled={isSubmitting}
                  />
                </div>

                <PrimaryButton
                  type="submit"
                  size="md"
                  className="mt-3 font-secondary text-[clamp(14px,1.6vw,16px)]"
                  disabled={isSubmitting}
                >
                  <div className="flex flex-row items-center gap-2">
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </div>
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
