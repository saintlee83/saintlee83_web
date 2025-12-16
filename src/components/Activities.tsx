"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ExternalLink,
  X,
  Trophy,
  Users,
  BookOpen,
  Code2,
  Mic,
  PenTool,
  GraduationCap,
  Award,
} from "lucide-react";
import activitiesData from "@/data/activities.json";

interface Activity {
  id: string;
  title: string;
  organization: string;
  type: string;
  year: number;
  featured: boolean;
  date: string;
  location: string;
  description: string;
  longDescription: string;
  highlights: string[];
  link?: string;
  image?: string;
}

const activities = activitiesData.activities as Activity[];
const colors = activitiesData.colors as Record<string, string>;
const labels = activitiesData.labels as Record<string, string>;
const tabs = activitiesData.tabs;

function getTypeIcon(type: string) {
  const iconProps = { className: "w-4 h-4" };
  switch (type) {
    case "conference":
      return <Mic {...iconProps} />;
    case "workshop":
      return <Users {...iconProps} />;
    case "opensource":
      return <Code2 {...iconProps} />;
    case "community":
      return <Users {...iconProps} />;
    case "award":
      return <Trophy {...iconProps} />;
    case "writing":
      return <PenTool {...iconProps} />;
    case "competition":
      return <Award {...iconProps} />;
    case "academy":
      return <GraduationCap {...iconProps} />;
    case "school":
      return <BookOpen {...iconProps} />;
    default:
      return <Calendar {...iconProps} />;
  }
}

function ActivityModal({
  activity,
  onClose,
}: {
  activity: Activity;
  onClose: () => void;
}) {
  const color = colors[activity.type] || "#6366f1";
  const hasImage = !!activity.image;

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
        className={`relative w-full max-h-[85vh] overflow-hidden rounded-2xl bg-[var(--background-secondary)] border border-[var(--glass-border)] flex ${
          hasImage ? "max-w-4xl" : "max-w-lg"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Content */}
        <div
          className={`flex flex-col overflow-y-auto ${
            hasImage ? "w-1/2" : "w-full"
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[var(--glass-border)] bg-[var(--background-secondary)]">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
              >
                <span style={{ color }}>{getTypeIcon(activity.type)}</span>
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color,
                  }}
                >
                  {activity.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {activity.organization}
                </p>
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
          <div className="p-5 space-y-5 flex-1">
            {/* Type Badge */}
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${color}15`, color }}
              >
                {getTypeIcon(activity.type)}
                {labels[activity.type] || activity.type}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[var(--background)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  기간
                </div>
                <p className="text-sm font-medium">{activity.date}</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--background)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  장소
                </div>
                <p className="text-sm font-medium">{activity.location}</p>
              </div>
            </div>

            {/* Long Description */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-[var(--foreground)]">
                상세 설명
              </h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {activity.longDescription}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-[var(--foreground)]">
                주요 내용
              </h4>
              <ul className="space-y-2">
                {activity.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
                  >
                    <span style={{ color }}>•</span>
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          {activity.link && (
            <div className="sticky bottom-0 p-5 border-t border-[var(--glass-border)] bg-[var(--background-secondary)]">
              <motion.a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--background)] transition-colors"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
                자세히 보기
              </motion.a>
            </div>
          )}
        </div>

        {/* Right: Image */}
        {hasImage && (
          <div className="hidden md:flex w-1/2 bg-[var(--background)] items-center justify-center p-4 border-l border-[var(--glass-border)]">
            <div className="relative w-full h-full min-h-[300px]">
              <Image
                src={activity.image!}
                alt={activity.title}
                fill
                className="object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Activities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("featured");

  const filteredActivities =
    activeTab === "featured"
      ? activities.filter((a) => a.featured)
      : activities.filter((a) => a.year.toString() === activeTab);

  return (
    <section
      id="activities"
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
            Activities
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            활동 · 대외활동
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-3">
            클릭하여 상세 정보를 확인하세요
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--accent-primary)] text-[var(--background)]"
                  : "bg-[var(--background-secondary)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Activities List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl mx-auto space-y-2"
          >
            {filteredActivities.map((activity, index) => {
              const color = colors[activity.type] || "#6366f1";
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                  className="group flex items-center gap-4 p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-all cursor-pointer"
                  onClick={() => setSelectedActivity(activity)}
                  whileHover={{ x: 4 }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <span style={{ color }}>{getTypeIcon(activity.type)}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3
                        className="text-sm font-semibold truncate group-hover:opacity-80 transition-opacity"
                        style={{ color }}
                      >
                        {activity.title}
                      </h3>
                      {activity.featured && (
                        <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      {activity.organization} · {activity.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="hidden sm:flex items-center gap-4 shrink-0">
                    <span
                      className="text-[10px] font-medium px-2 py-1 rounded"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {labels[activity.type] || activity.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] min-w-[100px]">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[var(--text-muted)]">
              해당 연도에 활동이 없습니다.
            </p>
          </motion.div>
        )}

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 rounded-xl bg-[var(--background-secondary)] border border-[var(--glass-border)] text-center"
        >
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <div
                className="text-3xl font-bold text-[var(--accent-primary)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {activities.length}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                총 활동
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold text-[var(--accent-secondary)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {activities.filter((a) => a.featured).length}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                주요 활동
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold text-[var(--accent-tertiary)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {new Set(activities.map((a) => a.type)).size}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                활동 유형
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activity Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityModal
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
