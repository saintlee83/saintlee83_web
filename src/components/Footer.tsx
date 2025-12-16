"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--glass-border)] bg-[var(--background-secondary)]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-base font-semibold"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-[var(--accent-primary)]">saintlee</span>
            <span className="text-[var(--foreground)]">83</span>
          </motion.a>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs">
            <span>© {currentYear} saintlee83. Made with</span>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 text-[var(--accent-primary)] fill-[var(--accent-primary)]" />
            </motion.span>
            <span>in Seoul</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {["홈", "소개", "프로젝트", "연락"].map((item) => (
              <a
                key={item}
                href={`#${
                  item === "홈"
                    ? "home"
                    : item === "소개"
                    ? "about"
                    : item === "프로젝트"
                    ? "projects"
                    : "contact"
                }`}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
