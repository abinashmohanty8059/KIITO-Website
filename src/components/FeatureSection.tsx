import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneFrame from "./PhoneFrame";
import { useCursorParallax } from "@/hooks/use-cursor-parallax";

interface FloatingCard {
  label: string;
  value: string;
  detail?: string;
  position: "top-right" | "bottom-left" | "top-left" | "bottom-right";
}

interface FeatureSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  reverse?: boolean;
  floatingCards?: FloatingCard[];
}

const cardPositions = {
  "top-right": "-top-8 -right-20 md:-right-28",
  "bottom-left": "-bottom-8 -left-16 md:-left-24",
  "top-left": "-top-8 -left-16 md:-left-24",
  "bottom-right": "-bottom-8 -right-20 md:-right-28",
};

const cardFloatConfigs = [
  { y: [0, -12, 0], delay: 0.3, duration: 3.5 },
  { y: [0, 10, 0], delay: 0.8, duration: 4.2 },
  { y: [0, -8, 0], delay: 1.2, duration: 3.8 },
];

const FeatureSection = ({ title, description, children, reverse = false, floatingCards = [] }: FeatureSectionProps) => {
  const cursor = useCursorParallax();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  
  const textY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [20, 0, 0, -20]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.5, 1], reverse ? [15, 0, -15] : [-15, 0, 15]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);
  const glowY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.15, 0.5, 0.15, 0]);
  const textRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [12, 0, 0, -12]);

  const tiltX = cursor.normalizedY * -10;
  const tiltY = cursor.normalizedX * 10;
  const shiftX = cursor.normalizedX * 16;
  const shiftY = cursor.normalizedY * 10;

  return (
    <section ref={sectionRef} className="relative py-36 md:py-52 px-6 overflow-hidden">
      <motion.div
        className="absolute top-1/2 pointer-events-none rounded-full"
        style={{
          y: glowY,
          opacity: glowOpacity,
          left: reverse ? "10%" : "90%",
          width: "1000px",
          height: "1000px",
          transform: `translate(-50%, -50%) translate(${cursor.normalizedX * -15}px, ${cursor.normalizedY * -15}px)`,
          background: "radial-gradient(circle, hsla(25, 100%, 50%, 0.2) 0%, hsla(25, 100%, 50%, 0.05) 30%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          opacity: 0.08,
          top: "15%",
          left: reverse ? "80%" : "20%",
          width: "550px",
          height: "550px",
          transform: `translate(-50%, -50%) translate(${cursor.normalizedX * 10}px, ${cursor.normalizedY * 10}px)`,
          background: "radial-gradient(circle, hsla(220, 60%, 50%, 0.15) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="floating-blob opacity-[0.06]"
        style={{
          width: "300px",
          height: "300px",
          top: reverse ? "55%" : "25%",
          left: reverse ? "5%" : "95%",
          background: "radial-gradient(circle, hsla(25, 100%, 50%, 0.3) 0%, transparent 70%)",
          transform: `translate(${cursor.normalizedX * 25}px, ${cursor.normalizedY * 20}px)`,
        }}
        animate={{ y: [0, 35, 0], x: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className={`max-w-6xl mx-auto flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-16 md:gap-28`}
        style={{ perspective: "1200px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          style={{ y: textY, rotateX: textRotateX }}
          className="flex-1 max-w-md"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight"
            initial={{ opacity: 0, x: reverse ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-muted-foreground mt-6 leading-relaxed"
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 120, scale: 0.75, rotateX: 30 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          style={{
            y: phoneY,
            rotateX: phoneRotateX,
            rotateY: phoneRotateY,
            scale: phoneScale,
          }}
          className="flex-shrink-0 relative"
        >
          <motion.div
            className="absolute -inset-20 rounded-full pointer-events-none"
            style={{
              opacity: glowOpacity,
              background: "radial-gradient(circle, hsla(25, 100%, 50%, 0.15) 0%, transparent 55%)",
              filter: "blur(50px)",
            }}
          />

          <motion.div
            animate={{
              y: [0, -18, 0],
              rotateZ: [0, 4, 0, -4, 0],
              scale: [1, 0.96, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
            style={{
              transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${shiftX}px, ${shiftY}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <PhoneFrame>{children}</PhoneFrame>

            {floatingCards.map((card, i) => {
              const config = cardFloatConfigs[i % cardFloatConfigs.length];
              const dirX = card.position.includes("right") ? 1 : -1;
              const dirY = card.position.includes("top") ? -1 : 1;

              return (
                <motion.div
                  key={card.label}
                  className={`absolute ${cardPositions[card.position]} hidden md:block w-40 rounded-xl border border-border/30 bg-card/80 backdrop-blur-md p-3 shadow-xl z-20`}
                  initial={{ opacity: 0, scale: 0.5, y: dirY * 40, rotateX: dirY * 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.12,
                    rotateY: dirX * 8,
                    z: 20,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    transform: `perspective(800px) rotateX(${cursor.normalizedY * -5}deg) rotateY(${cursor.normalizedX * dirX * 8}deg) translate(${cursor.normalizedX * dirX * 14}px, ${cursor.normalizedY * dirY * 12}px)`,
                    transformStyle: "preserve-3d",
                    boxShadow: "0 8px 32px -4px hsla(25, 100%, 50%, 0.1), 0 4px 16px -2px rgba(0,0,0,0.5)",
                  }}
                >
                  <motion.div
                    animate={{ y: config.y, rotateZ: [-1, 1, -1] }}
                    transition={{ duration: config.duration, repeat: Infinity, ease: "easeInOut", delay: config.delay }}
                  >
                    <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">{card.label}</div>
                    <div className="text-[11px] font-semibold text-foreground mt-1">{card.value}</div>
                    {card.detail && <div className="text-[9px] text-primary mt-0.5">{card.detail}</div>}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
