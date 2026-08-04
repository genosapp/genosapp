"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-black/30" : ""
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image
            src="/logo.jpg"
            alt="GenOS logo"
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg">GenOS</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-[#b7c0e0] md:flex">
          <a href="#services" className="transition hover:text-white">Services</a>
          <a href="#work" className="transition hover:text-white">Work</a>
          <a href="#aura" className="transition hover:text-white">Aura</a>
          <a href="#process" className="transition hover:text-white">Process</a>
        </div>
        <a
          href="#contact"
          className="btn-primary rounded-xl px-4 py-2 text-sm font-medium"
        >
          Book a build call
        </a>
      </nav>
    </header>
  );
}
