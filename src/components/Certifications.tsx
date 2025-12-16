"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Award,
  Calendar,
  ExternalLink,
  CheckCircle,
  X,
  Building2,
  Hash,
  BookOpen,
} from "lucide-react";
import certificationsData from "@/data/certifications.json";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  link?: string;
  color: string;
  skills: string[];
  description: string;
  examInfo?: string;
  validPeriod?: string;
  image?: string;
}

const certifications = certificationsData.certifications as Certification[];

function CertificationModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--background-secondary)] border border-[var(--glass-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Header - 이미지가 있을 때만 표시 */}
        {cert.image && (
          <div className="relative w-full h-32 bg-[var(--background)] flex items-center justify-center">
            <div className="relative w-24 h-24">
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[var(--glass-border)] bg-[var(--background-secondary)]">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${cert.color}20` }}
            >
              <Award className="w-6 h-6" style={{ color: cert.color }} />
            </div>
            <div>
              <h3
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: cert.color,
                }}
              >
                {cert.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">{cert.issuer}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--glass-bg)] transition-colors"
          >
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {cert.expiry ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                <CheckCircle className="w-3.5 h-3.5" />
                유효 (~ {cert.expiry})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                <CheckCircle className="w-3.5 h-3.5" />
                영구 자격
              </span>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[var(--background)]">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
                <Calendar className="w-3.5 h-3.5" />
                취득일
              </div>
              <p className="text-sm font-medium">{cert.date}</p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--background)]">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
                <Building2 className="w-3.5 h-3.5" />
                발급기관
              </div>
              <p className="text-sm font-medium truncate">{cert.issuer}</p>
            </div>
            {cert.credentialId && (
              <div className="p-3 rounded-lg bg-[var(--background)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
                  <Hash className="w-3.5 h-3.5" />
                  자격번호
                </div>
                <p className="text-sm font-medium font-mono">
                  {cert.credentialId}
                </p>
              </div>
            )}
            {cert.examInfo && (
              <div className="p-3 rounded-lg bg-[var(--background)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  시험 정보
                </div>
                <p className="text-sm font-medium">{cert.examInfo}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-[var(--foreground)]">
              자격증 소개
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {cert.description}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-[var(--foreground)]">
              관련 기술
            </h4>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: `${cert.color}15`,
                    color: cert.color,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        {cert.link && (
          <div className="sticky bottom-0 p-5 border-t border-[var(--glass-border)] bg-[var(--background-secondary)]">
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--background)] transition-colors"
              style={{ backgroundColor: cert.color }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              인증 페이지 방문
            </motion.a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section
      id="certifications"
      className="py-24 relative overflow-hidden bg-[var(--background-secondary)]"
      ref={ref}
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[var(--accent-primary)] text-xs font-medium tracking-widest uppercase mb-4 block">
            Certifications
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            자격증 · 인증
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-3">
            클릭하여 상세 정보를 확인하세요
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-[var(--background)] border border-[var(--glass-border)] group hover:border-opacity-50 transition-all cursor-pointer"
              style={{ borderLeftWidth: "3px", borderLeftColor: cert.color }}
              onClick={() => setSelectedCert(cert)}
              whileHover={{ y: -3 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${cert.color}15` }}
                >
                  <Award className="w-5 h-5" style={{ color: cert.color }} />
                </div>
                {cert.expiry ? (
                  <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <CheckCircle className="w-3 h-3" />
                    유효
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--glass-bg)] text-[var(--text-muted)]">
                    영구
                  </span>
                )}
              </div>

              {/* Title & Issuer */}
              <h3
                className="text-base font-semibold mb-1 group-hover:opacity-80 transition-opacity"
                style={{ color: cert.color }}
              >
                {cert.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-3">
                {cert.issuer}
              </p>

              {/* Date Info */}
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {cert.date}
                </span>
              </div>

              {/* Skills Preview */}
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[10px] bg-[var(--glass-bg)] text-[var(--text-muted)]"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && (
                  <span className="px-2 py-0.5 rounded text-[10px] text-[var(--text-muted)]">
                    +{cert.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Hover indicator */}
              <div className="mt-3 pt-3 border-t border-[var(--glass-border)] opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  className="text-xs font-medium"
                  style={{ color: cert.color }}
                >
                  자세히 보기 →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 rounded-xl bg-[var(--background)] border border-[var(--glass-border)] text-center"
        >
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <div
                className="text-3xl font-bold text-[var(--accent-primary)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {certifications.length}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                총 자격증
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold text-[var(--accent-secondary)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {certifications.filter((c) => c.expiry).length}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                클라우드 인증
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold text-[var(--accent-tertiary)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {certifications.filter((c) => !c.expiry).length}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                국가 자격증
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certification Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificationModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
