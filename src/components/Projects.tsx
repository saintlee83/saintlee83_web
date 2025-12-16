"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight, X, Calendar, Users, Layers } from "lucide-react";
import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  color: string;
  duration: string;
  team: string;
  role: string;
  highlights: string[];
  image?: string;
}

const projects = projectsData.projects as Project[];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--background-secondary)] border border-[var(--glass-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Header */}
        {project.image && (
          <div className="relative w-full aspect-video bg-[var(--background)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] to-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--glass-border)] bg-[var(--background-secondary)]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <span className="text-lg font-bold" style={{ color: project.color }}>
                {project.title.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                {project.title}
              </h3>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded"
                style={{ backgroundColor: `${project.color}20`, color: project.color }}
              >
                {project.role}
              </span>
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
        <div className="p-6 space-y-6">
          {/* Project Info */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Calendar className="w-4 h-4" style={{ color: project.color }} />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Users className="w-4 h-4" style={{ color: project.color }} />
              <span>팀 {project.team}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Layers className="w-4 h-4" style={{ color: project.color }} />
              <span>{project.tags.length}개 기술 스택</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold mb-2 text-[var(--foreground)]">프로젝트 소개</h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-[var(--foreground)]">주요 성과</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-[var(--foreground)]">기술 스택</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--background)] border border-[var(--glass-border)]"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center gap-3 p-6 border-t border-[var(--glass-border)] bg-[var(--background-secondary)]">
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--background)] transition-colors"
            style={{ backgroundColor: project.color }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[var(--background)] border border-[var(--glass-border)] hover:border-[var(--accent-primary)]/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-4 h-4" />
            Source Code
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
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
            Projects
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            프로젝트 포트폴리오
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-3">
            클릭하여 상세 정보를 확인하세요
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-16 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-8 items-center cursor-pointer group ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Visual */}
              <div
                className={`relative aspect-video rounded-xl overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`,
                }}
              >
                {/* 이미지가 있으면 이미지 표시, 없으면 숫자 표시 */}
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[120px] font-bold opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ fontFamily: "var(--font-playfair)", color: project.color }}
                    >
                      0{index + 1}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--background)]/0 group-hover:bg-[var(--background)]/60 transition-colors flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: project.color, color: "var(--background)" }}
                  >
                    자세히 보기
                  </motion.div>
                </div>
              </div>

              {/* Project Info */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-medium mb-3"
                  style={{ backgroundColor: `${project.color}15`, color: project.color }}
                >
                  Featured
                </span>
                <h3
                  className="text-2xl font-bold mb-3 group-hover:text-[var(--accent-primary)] transition-colors"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {project.title}
                </h3>
                <p className="text-[var(--text-muted)] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs bg-[var(--background)] border border-[var(--glass-border)] text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 rounded text-xs text-[var(--text-muted)]">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                    style={{ color: project.color }}
                  >
                    자세히 보기 <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3
            className="text-xl font-semibold text-center mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Other Projects
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="p-5 rounded-xl bg-[var(--background)] border border-[var(--glass-border)] group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Thumbnail - 이미지가 있을 때만 표시 */}
                {project.image && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 -mt-1">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}15` }}
                  >
                    <span className="text-base font-bold" style={{ color: project.color }}>
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: `${project.color}15`, color: project.color }}
                  >
                    자세히 보기
                  </span>
                </div>
                <h4 className="text-base font-semibold mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
