import { Logotype, Monogram } from "@/components/Logotype";
import { Chat, Phone, Pin } from "@/components/icons";
import { siteConfig } from "@/data/siteConfig";
import { whatsappHref } from "@/lib/stay";

const links = [
  { label: "The stay", href: "#stay" },
  { label: "What you get", href: "#ledger" },
  { label: "Rooms", href: "#rooms" },
  { label: "Guests", href: "#guests" },
  { label: "Getting here", href: "#place" },
  { label: "Rates", href: "#rates" },
];

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-[var(--rule)] bg-ink-900 pb-28 sm:pb-8"
    >
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <Monogram className="h-8 w-8 text-brass" />
            <Logotype className="h-[18px] w-auto text-sand-100" />
          </div>
          <p className="mt-6 max-w-[34ch] text-[0.9rem] leading-relaxed text-sand-500">
            Self-catering studio apartments in Parlock, Durban. Family run since{" "}
            {siteConfig.established}.
          </p>
          <p className="mt-5 flex items-start gap-2.5 text-[0.9rem] text-sand-500">
            <Pin size={16} className="mt-0.5 shrink-0 text-brass" />
            {siteConfig.address}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="index mb-5">On this page</h2>
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.9rem] text-sand-300 transition-colors hover:text-brass"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="index mb-5">Contact</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href={`tel:+${siteConfig.whatsappNumber}`}
                className="tabular flex items-center gap-2.5 text-[0.9rem] text-sand-300 transition-colors hover:text-brass"
              >
                <Phone size={16} className="text-brass" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(null)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[0.9rem] text-sand-300 transition-colors hover:text-brass"
              >
                <Chat size={16} className="text-brass" />
                WhatsApp
              </a>
            </li>
          </ul>
          {/* TODO: add the business email address once confirmed. */}
        </div>
      </div>

      <div className="border-t border-[var(--rule)]">
        <div className="shell flex flex-col justify-between gap-2 py-6 text-[0.75rem] text-sand-500 sm:flex-row">
          <p>© {new Date().getFullYear()} RJ&apos;s Guesthouse</p>
          {/* TODO: replace with the studio credit before launch. */}
        </div>
      </div>
    </footer>
  );
}
