import React from "react";
import { ContactHero } from "@/components/features/contact/contactHero";
import { ContactFormSection } from "@/components/features/contact/contactFormSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Melwyn Titus",
  description: "Get in touch for collaborations and opportunities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Melwyn Titus",
    description: "Get in touch for collaborations and opportunities.",
    url: "https://www.melwyn.co.in/contact",
    images: ["/og-image.png"],
  },
};

const ContactPage = () => {
  return (
    <div className="min-h-svh text-[var(--default-text-color)]">
      <ContactHero />
      <ContactFormSection />
    </div>
  );
};

export default ContactPage;
