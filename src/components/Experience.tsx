"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Building2, Calendar, MapPin } from "lucide-react";
import experienceData from "@/data/experience.json";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  color: string;
  logo?: string;
}

const experiences = experienceData.experiences as Experience[];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden"
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
            Experience
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            경력 · 학력 사항
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-[var(--background-secondary)] border border-[var(--glass-border)]"
              style={{ borderLeftWidth: "2px", borderLeftColor: exp.color }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  {/* Company Logo */}
                  {exp.logo ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[var(--background)]">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${exp.color}15` }}
                    >
                      <Building2
                        className="w-5 h-5"
                        style={{ color: exp.color }}
                      />
                    </div>
                  )}
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: exp.color }}
                    >
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--background)] text-xs text-[var(--text-muted)]">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-1.5 mb-4">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-[var(--text-muted)] flex items-start gap-2"
                  >
                    <span style={{ color: exp.color }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: `${exp.color}15`,
                      color: exp.color,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
