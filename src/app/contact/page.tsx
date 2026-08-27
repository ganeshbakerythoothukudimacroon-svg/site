import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Mail, Clock, FileText } from "lucide-react";
import { isPlaceholder, pageMetadata } from "@/lib/seo/metadata";
import { formatAddress, siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact Ganesh Bakery Shop 532 | Thoothukudi",
  description:
    "Get in touch with Ganesh Bakery, Shop No. 532, Thoothukudi (Tuticorin) — address, phone, WhatsApp, email and directions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-[color:var(--text-primary)] sm:text-5xl">
          Contact {siteConfig.brandName}
        </h1>
        <p className="mt-3 text-lg text-[color:var(--text-secondary)]">
          {siteConfig.brandName} — {siteConfig.shopBranch}, {siteConfig.locality}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="glass-card space-y-6 rounded-[var(--radius-card)] p-6">
            <ContactRow icon={MapPin} label="Address">
              <p className="text-[color:var(--text-primary)]">{formatAddress()}</p>
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-semibold text-[color:var(--gold-400)] hover:text-[color:var(--gold-300)]"
              >
                Get Directions →
              </a>
            </ContactRow>

            <ContactRow icon={Phone} label="Phone">
              <p className="text-[color:var(--text-primary)]">
                {isPlaceholder(siteConfig.phone) ? "[CLIENT TO PROVIDE: phone number]" : siteConfig.phone}
              </p>
            </ContactRow>

            <ContactRow icon={MessageCircle} label="WhatsApp">
              <p className="text-[color:var(--text-primary)]">
                {isPlaceholder(siteConfig.whatsappNumber) ? (
                  "[CLIENT TO PROVIDE: WhatsApp number]"
                ) : (
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`} className="hover:text-[color:var(--gold-400)]">
                    +{siteConfig.whatsappNumber}
                  </a>
                )}
              </p>
            </ContactRow>

            <ContactRow icon={Mail} label="Email">
              <p className="text-[color:var(--text-primary)]">
                {isPlaceholder(siteConfig.email) ? "[CLIENT TO PROVIDE: email address]" : siteConfig.email}
              </p>
            </ContactRow>

            <ContactRow icon={Clock} label="Opening Hours">
              <p className="text-[color:var(--text-primary)]">{siteConfig.openingHours}</p>
            </ContactRow>

            <ContactRow icon={FileText} label="GSTIN">
              <p className="text-[color:var(--text-primary)]">{siteConfig.gstNumber}</p>
            </ContactRow>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3.5">
      <span className="glass-subtle mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[color:var(--gold-400)]">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <h2 className="label-tracked text-[color:var(--gold-500)]">{label}</h2>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
