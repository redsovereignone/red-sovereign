import { useState, useEffect } from "react";

const navLinks = [
  { label: "Approach", href: "/#approach" },
  { label: "Why Us", href: "/#difference" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((prev) => !prev);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggle}
        className="md:hidden fixed top-5 right-6 sm:right-10 z-[60] w-10 h-10 flex flex-col justify-center items-center gap-1.5"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span
          className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-cream-muted text-2xl font-display font-bold no-underline hover:text-cream transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* CTA Button */}
          <a
            href="/#review"
            onClick={handleLinkClick}
            className="mt-4 bg-red text-cream px-8 py-3.5 rounded-sm font-display font-semibold text-sm tracking-[0.06em] hover:bg-red-glow hover:shadow-[0_0_30px_rgba(200,16,46,0.3)] transition-all duration-300 no-underline"
          >
            AI Possibilities Review
          </a>
        </div>
      </div>
    </>
  );
}
