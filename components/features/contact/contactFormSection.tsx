"use client";

import React, { useRef } from "react";
import { Input, Textarea, Button } from "@/components/ui";
import { submitContactForm } from "@/app/actions/submitContact";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Clock, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const ContactFormSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    if (!formData.get("subject")) {
      formData.append("subject", "New Contact Form Submission");
    }

    try {
      const result = await submitContactForm(null, formData);
      if (result.success) {
        setMessage({ text: "Message sent! I'll get back to you soon.", type: "success" });
        formRef.current?.reset();
      } else {
        setMessage({ text: result.message || "Something went wrong.", type: "error" });
      }
    } catch {
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className={cn(
        "relative px-[clamp(16px,4vw,60px)] pt-[clamp(40px,6vh,60px)] pb-[clamp(80px,10vh,120px)]",
        "max-w-[1400px] mx-auto",
        "flex flex-col lg:flex-row lg:items-start lg:justify-between",
        "2xl:px-0 gap-[clamp(48px,6vw,80px)] z-10"
      )}
    >
      {/* Left — Contact Info Card */}
      <div className="flex-1 flex flex-col gap-6 max-w-[520px]">
        <div>
          <h2 className="font-secondary text-[clamp(22px,2.5vw,30px)] font-semibold text-foreground mb-2 leading-snug">
            Get in touch
          </h2>
          <p className="font-secondary text-[clamp(15px,1.1vw,17px)] font-normal leading-relaxed text-white/60">
            I typically respond within 24–48 hours. For urgent inquiries, email is the fastest route.
          </p>
        </div>

        {/* Info card */}
        <div
          className={cn(
            "bg-white/[0.04] border border-white/[0.08] rounded-2xl",
            "p-[clamp(20px,3vw,32px)] flex flex-col gap-6"
          )}
        >
          <div className="flex flex-col gap-2">
            <h4 className="flex items-center gap-2 text-[clamp(14px,1vw,16px)] font-medium text-foreground">
              <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
              Email
            </h4>
            <a
              href="mailto:m.works.gd@gmail.com"
              className="text-white/60 hover:text-brand-blue transition-colors text-[clamp(14px,1vw,15px)] font-secondary"
            >
              m.works.gd@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="flex items-center gap-2 text-[clamp(14px,1vw,16px)] font-medium text-foreground">
              <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
              Location
            </h4>
            <p className="text-white/60 text-[clamp(14px,1vw,15px)] font-secondary">
              Mumbai, India 🇮🇳 — Open to remote worldwide
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="flex items-center gap-2 text-[clamp(14px,1vw,16px)] font-medium text-foreground">
              <Clock className="w-4 h-4 text-brand-blue flex-shrink-0" />
              Response Time
            </h4>
            <p className="text-white/60 text-[clamp(14px,1vw,15px)] font-secondary">
              Usually within 24–48 hours
            </p>
          </div>

          <div className="border-t border-white/[0.06] pt-5 flex gap-3">
            <Link
              href="https://www.linkedin.com/in/melwyn-john-8125bb214"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={cn(
                "flex items-center gap-2 text-[clamp(13px,1vw,14px)] font-secondary",
                "text-white/60 hover:text-brand-blue transition-colors"
              )}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/devtitus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={cn(
                "flex items-center gap-2 text-[clamp(13px,1vw,14px)] font-secondary",
                "text-white/60 hover:text-brand-blue transition-colors"
              )}
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </div>
        </div>

        <blockquote className="text-white/40 text-[clamp(13px,1vw,15px)] leading-relaxed italic font-secondary border-l-2 border-brand-blue/30 pl-4">
          &ldquo;Great design is a relationship between form and function.&rdquo;
        </blockquote>
      </div>

      {/* Right — Form Card */}
      <div
        className={cn(
          "flex-1 max-w-[600px] w-full",
          "bg-white/[0.04] border border-white/[0.08] rounded-2xl",
          "p-[clamp(20px,3vw,32px)] flex flex-col justify-center"
        )}
      >
        <form
          ref={formRef}
          className="flex flex-col gap-6 w-full"
          action={handleSubmit}
          noValidate
        >
          {/* Feedback message */}
          {message && (
            <div
              role="alert"
              className={cn(
                "p-3 rounded-lg text-sm font-medium font-secondary",
                message.type === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              )}
            >
              {message.text}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="font-secondary text-[clamp(14px,1vw,15px)] font-medium text-white/80"
            >
              Name <span className="text-brand-blue" aria-hidden="true">*</span>
            </label>
            <Input
              id="contact-name"
              type="text"
              placeholder="Your name"
              required
              name="name"
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="font-secondary text-[clamp(14px,1vw,15px)] font-medium text-white/80"
            >
              Email Address <span className="text-brand-blue" aria-hidden="true">*</span>
            </label>
            <Input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              required
              name="email"
              disabled={isSubmitting}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-message"
              className="font-secondary text-[clamp(14px,1vw,15px)] font-medium text-white/80"
            >
              Message <span className="text-brand-blue" aria-hidden="true">*</span>
            </label>
            <Textarea
              id="contact-message"
              placeholder="Tell me about your project or idea..."
              required
              name="message"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between gap-4 mt-1">
            <p className="text-white/30 text-[12px] font-secondary">
              <span className="text-brand-blue">*</span> Required fields
            </p>
            <Button
              type="submit"
              className="bg-foreground text-background px-6 py-6 rounded font-secondary text-[clamp(14px,1vw,16px)] font-medium transition-all duration-200 shadow-[4px_4px_0px_0px_#0057E0] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0057E0] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#0057E0] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export { ContactFormSection };
