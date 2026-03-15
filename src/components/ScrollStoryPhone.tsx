import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import PhoneFrame from "./PhoneFrame";
import { useCursorParallax } from "@/hooks/use-cursor-parallax";

interface StorySection {
  title: string;
  description: string;
  screen: React.ReactNode;
  floatingCards: {
    label: string;
    value: string;
    detail?: string;
    position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
  }[];
}

interface ScrollStoryPhoneProps {
  sections: StorySection[];
}

const cardPositionClasses = {
  "top-right": "-top-6 -right-24",
  "bottom-left": "-bottom-6 -left-24",
  "top-left": "-top-6 -left-24",
  "bottom-right": "-bottom-6 -right-24",
};

const ScrollStoryPhone = ({ sections }: ScrollStoryPhoneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useCursorParallax();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sectionCount = sections.length;

  const tiltX = pointer.normalizedY * -8;
  const tiltY = pointer.normalizedX * 8;
  const shiftX = pointer.normalizedX * 12;
  const shiftY = pointer.normalizedY * 8;

  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.15, 0.35, 0.35, 0.15]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${sectionCount * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(circle, hsla(25, 100%, 50%, 0.18) 0%, hsla(25, 100%, 50%, 0.04) 40%, transparent 65%)",
            transform: `translate(calc(-50% + ${pointer.normalizedX * 20}px), calc(-50% + ${pointer.normalizedY * 20}px))`,
            filter: "blur(50px)",
          }}
        />

        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, hsla(220, 70%, 50%, 0.15) 0%, transparent 60%)",
            transform: `translate(${pointer.normalizedX * -12}px, ${pointer.normalizedY * -12}px)`,
            filter: "blur(60px)",
          }}
        />

        <motion.div
          className="floating-blob w-[250px] h-[250px] top-[10%] right-[8%] opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, hsla(25, 100%, 55%, 0.3) 0%, transparent 70%)",
            transform: `translate(${pointer.normalizedX * 20}px, ${pointer.normalizedY * 15}px)`,
          }}
          animate={{ y: [0, 25, 0], x: [0, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="floating-blob w-[200px] h-[200px] bottom-[15%] left-[5%] opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, hsla(200, 60%, 50%, 0.2) 0%, transparent 70%)",
            transform: `translate(${pointer.normalizedX * -15}px, ${pointer.normalizedY * -10}px)`,
          }}
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20 px-6">
          <div className="flex-1 max-w-md order-2 md:order-1 relative min-h-[200px]">
            {sections.map((section, i) => {
              const start = i / sectionCount;
              const end = (i + 1) / sectionCount;
              return (
                <ScrollSectionText
                  key={i}
                  title={section.title}
                  description={section.description}
                  scrollYProgress={scrollYProgress}
                  rangeStart={start}
                  rangeEnd={end}
                  isFirst={i === 0}
                  isLast={i === sectionCount - 1}
                />
              );
            })}
          </div>

          <motion.div
            className="flex-shrink-0 relative order-1 md:order-2"
            style={{
              perspective: 1200,
            }}
          >
            <motion.div
              animate={{
                y: [0, -18, 0],
                rotateZ: [0, 2, 0, -2, 0],
                scale: [1, 0.975, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
              style={{
                rotateX: scrollRotateX,
                rotateY: scrollRotateY,
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${shiftX}px, ${shiftY}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <PhoneFrame>
                {sections.map((section, i) => (
                  <ScrollScreen
                    key={i}
                    index={i}
                    scrollYProgress={scrollYProgress}
                    sectionCount={sectionCount}
                  >
                    {section.screen}
                  </ScrollScreen>
                ))}
              </PhoneFrame>

              {sections.map((section, sectionIdx) => (
                <ScrollFloatingCards
                  key={sectionIdx}
                  cards={section.floatingCards}
                  sectionIdx={sectionIdx}
                  sectionCount={sectionCount}
                  scrollYProgress={scrollYProgress}
                  pointer={pointer}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


function ScrollSectionText({
  title,
  description,
  scrollYProgress,
  rangeStart,
  rangeEnd,
  isFirst,
  isLast,
}: {
  title: string;
  description: string;
  scrollYProgress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const peak1 = rangeStart + 0.08;
  const peak2 = rangeEnd - 0.08;

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [peak2, rangeEnd]
      : isLast
        ? [rangeStart, peak1]
        : [rangeStart, peak1, peak2, rangeEnd],
    isFirst
      ? [1, 0]
      : isLast
        ? [0, 1]
        : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [peak2, rangeEnd]
      : isLast
        ? [rangeStart, peak1]
        : [rangeStart, peak1, peak2, rangeEnd],
    isFirst
      ? [0, -40]
      : isLast
        ? [40, 0]
        : [40, 0, 0, -40]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mt-6 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}


function ScrollScreen({
  children,
  index,
  scrollYProgress,
  sectionCount,
}: {
  children: React.ReactNode;
  index: number;
  scrollYProgress: MotionValue<number>;
  sectionCount: number;
}) {
  const start = index / sectionCount;
  const end = (index + 1) / sectionCount;
  const fadeIn = start + 0.03;
  const fadeOut = end - 0.03;

  
  const isFirst = index === 0;
  const isLast = index === sectionCount - 1;

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [fadeOut, end]
      : isLast
        ? [start, fadeIn]
        : [start, fadeIn, fadeOut, end],
    isFirst
      ? [1, 0]
      : isLast
        ? [0, 1]
        : [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    isFirst
      ? [fadeOut, end]
      : isLast
        ? [start, fadeIn]
        : [start, fadeIn, fadeOut, end],
    isFirst
      ? [1, 0.92]
      : isLast
        ? [0.92, 1]
        : [0.92, 1, 1, 0.92]
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, scale }}
    >
      {children}
    </motion.div>
  );
}


type CursorPoint = { normalizedX: number; normalizedY: number };

function ScrollFloatingCards({
  cards,
  sectionIdx,
  sectionCount,
  scrollYProgress,
  pointer,
}: {
  cards: StorySection["floatingCards"];
  sectionIdx: number;
  sectionCount: number;
  scrollYProgress: MotionValue<number>;
  pointer: CursorPoint;
}) {
  const start = sectionIdx / sectionCount;
  const end = (sectionIdx + 1) / sectionCount;
  const fadeIn = start + 0.05;
  const fadeOut = end - 0.05;
  const isFirst = sectionIdx === 0;
  const isLast = sectionIdx === sectionCount - 1;

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [fadeOut, end]
      : isLast
        ? [start, fadeIn]
        : [start, fadeIn, fadeOut, end],
    isFirst
      ? [1, 0]
      : isLast
        ? [0, 1]
        : [0, 1, 1, 0]
  );

  const floatConfigs = [
    { y: [0, -7, 0], delay: 0.3, duration: 4.5 },
    { y: [0, 6, 0], delay: 0.8, duration: 5.2 },
  ];

  return (
    <motion.div style={{ opacity }} className="hidden md:block">
      {cards.map((card, i) => {
        const config = floatConfigs[i % floatConfigs.length];
        const dirX = card.position.includes("right") ? 1 : -1;
        const dirY = card.position.includes("top") ? -1 : 1;
        const posClass = cardPositionClasses[card.position as keyof typeof cardPositionClasses] || "";

        return (
          <motion.div
            key={card.label}
            className={`absolute ${posClass} w-36 rounded-xl border border-border/30 bg-card/80 backdrop-blur-md p-3 shadow-lg z-20`}
            style={{
              transform: `perspective(800px) rotateX(${pointer.normalizedY * -3}deg) rotateY(${pointer.normalizedX * dirX * 5}deg) translate(${pointer.normalizedX * dirX * 10}px, ${pointer.normalizedY * dirY * 8}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{ y: config.y }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: config.delay,
              }}
            >
              <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
                {card.label}
              </div>
              <div className="text-[11px] font-semibold text-foreground mt-1">
                {card.value}
              </div>
              {card.detail && (
                <div className="text-[9px] text-primary mt-0.5">{card.detail}</div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ScrollStoryPhone;
