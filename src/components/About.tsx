"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket, Coffee } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "클린 코드",
    description: "읽기 쉽고 유지보수하기 좋은 코드를 작성합니다",
    color: "#10b981",
  },
  {
    icon: Palette,
    title: "디자인 감각",
    description: "사용자 중심의 아름다운 인터페이스를 설계합니다",
    color: "#06b6d4",
  },
  {
    icon: Rocket,
    title: "성능 최적화",
    description: "빠르고 효율적인 애플리케이션을 구축합니다",
    color: "#8b5cf6",
  },
  {
    icon: Coffee,
    title: "지속적 학습",
    description: "새로운 기술과 트렌드를 끊임없이 탐구합니다",
    color: "#3b82f6",
  },
];

const stats = [
  { value: "2016", label: "Study Since" },
  { value: "5+", label: "Awards" },
  { value: "30+", label: "Activities" },
  { value: "∞", label: "Coffee" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--accent-primary)] text-xs font-medium tracking-widest uppercase mb-4 block">
              About
            </span>

            <h2
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              코드로 아이디어를
              <br />
              현실로 만드는 개발자
            </h2>

            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
              <p>
                안녕하세요. 저는 AI·백엔드 중심 개발자로, 사람들의 문제를
                해결하고 삶의 질을 개선하는 제품을 만드는 데 관심이 많습니다.
                실시간 처리와 성능 최적화, 모델 서빙/데이터 파이프라인 구축
                경험을 바탕으로 신뢰할 수 있는 서비스를 설계·구현하는 것을
                강점으로 삼고 있습니다.
              </p>
              <p>
                프로젝트를 진행 할 때는 기능을 그냥 붙이기보다, 사용자에게
                진짜로 어떤 도움이 되는지부터 먼저 생각합니다. 빠르게 만들어
                보고, 데이터와 피드백으로 검증하면서 계속 다듬는 방식으로 성장해
                왔습니다.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--glass-border)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div
                    className="text-2xl font-bold text-[var(--accent-primary)]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Highlight Cards */}
          <div className="grid grid-cols-2 gap-3">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-xl bg-[var(--background-secondary)] border border-[var(--glass-border)] hover:border-opacity-50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: item.color }}
                  />
                </div>
                <h3
                  className="text-base font-semibold mb-1 text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
