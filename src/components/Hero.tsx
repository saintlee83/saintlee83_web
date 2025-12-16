"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail, Twitter, User } from "lucide-react";

// 프로필 이미지 경로 - 이 경로를 실제 이미지로 변경하세요
const PROFILE_IMAGE = "/images/profile.jpg";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@saintlee.dev", label: "Email" },
];

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient */}
        <div
          className="absolute w-[1000px] h-[1000px] rounded-full opacity-30"
          style={{
            top: "-40%",
            left: "-20%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            bottom: "-30%",
            right: "-15%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid" />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:justify-start order-2 lg:order-1"
            >
              <div className="relative">
                {/* Decorative ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-[var(--accent-primary)]/20"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Glow effect */}
                <div
                  className="absolute -inset-6 rounded-full opacity-30 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)",
                  }}
                />

                {/* Profile Image Container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[var(--background-secondary)] shadow-2xl">
                  {/* Fallback placeholder (이미지 로드 전 또는 실패 시 표시) */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 z-0">
                      <User className="w-24 h-24 md:w-32 md:h-32 text-[var(--accent-primary)]/50" />
                    </div>
                  )}

                  {/* Profile Image */}
                  {!imageError && (
                    <Image
                      src={PROFILE_IMAGE}
                      alt="Profile"
                      fill
                      className={`object-cover z-10 transition-opacity duration-300 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      priority
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        setImageError(true);
                        setImageLoaded(false);
                      }}
                    />
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 to-transparent z-20 pointer-events-none" />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 md:bottom-4 md:right-0 z-30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="px-4 py-2 rounded-full bg-[var(--accent-primary)] text-[var(--background)] text-sm font-medium shadow-lg">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Open to work
                    </span>
                  </div>
                </motion.div>

                {/* Decorative dots */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[var(--accent-secondary)]"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/4 -right-6 w-4 h-4 rounded-full bg-[var(--accent-tertiary)]"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  Available for work
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <span className="text-[var(--text-secondary)]">Delivering</span>
                <br />
                <span className="text-[var(--accent-primary)]">Value</span>
                <br />
                <span className="text-[var(--foreground)]">to the World</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0"
              >
                세상에 가치를 더하는 개발자, 이제석입니다. 디지털 기술과 AI로 더
                나은 일상과 경험을 만들어가고 싶습니다.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-12"
              >
                <motion.a
                  href="#projects"
                  className="px-6 py-2.5 rounded-md bg-[var(--accent-primary)] text-[var(--background)] font-medium transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  프로젝트 보기
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-6 py-2.5 rounded-md border border-[var(--glass-border)] text-[var(--foreground)] font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  연락하기
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-3"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-md bg-[var(--background-secondary)] border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">
            Scroll
          </span>
          <ArrowDown className="w-3 h-3" />
        </motion.a>
      </motion.div>
    </section>
  );
}
