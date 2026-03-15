import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import PhoneFrame from "./PhoneFrame";
import DashboardScreen from "./screens/DashboardScreen";
import { useCursorParallax } from "@/hooks/use-cursor-parallax";

const HeroSection = () => {
  const cursor = useCursorParallax();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const textRotateX = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);
  const phoneScrollY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const phoneOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.6], [0, 35]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.8]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const tiltX = cursor.normalizedY * -10;
  const tiltY = cursor.normalizedX * 10;
  const shiftX = cursor.normalizedX * 16;
  const shiftY = cursor.normalizedY * 12;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
        style={{
          scale: glowScale,
          opacity: 0.35,
          background:
            "radial-gradient(circle, hsla(25, 100%, 50%, 0.22) 0%, hsla(25, 100%, 50%, 0.06) 30%, transparent 60%)",
          transform: `translate(calc(-50% + ${cursor.normalizedX * 25}px), calc(-50% + ${cursor.normalizedY * 25}px))`,
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, hsla(220, 70%, 50%, 0.15) 0%, transparent 55%)",
          transform: `translate(${cursor.normalizedX * -18}px, ${cursor.normalizedY * -18}px)`,
          filter: "blur(40px)",
        }}
      />

      <motion.div
        className="floating-blob w-[400px] h-[400px] top-[10%] right-[5%] opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, hsla(25, 100%, 55%, 0.35) 0%, transparent 65%)",
          transform: `translate(${cursor.normalizedX * 30}px, ${cursor.normalizedY * 22}px)`,
        }}
        animate={{ y: [0, 45, 0], x: [0, -25, 0], scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="floating-blob w-[350px] h-[350px] bottom-[15%] left-[3%] opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, hsla(200, 60%, 50%, 0.25) 0%, transparent 65%)",
          transform: `translate(${cursor.normalizedX * -20}px, ${cursor.normalizedY * -15}px)`,
        }}
        animate={{ y: [0, -35, 0], x: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="floating-blob w-[200px] h-[200px] top-[60%] right-[20%] opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, hsla(40, 100%, 60%, 0.3) 0%, transparent 70%)",
        }}
        animate={{ y: [0, 60, -20, 0], x: [0, -30, 20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: textY, opacity: textOpacity, scale: textScale, rotateX: textRotateX }}
        className="text-center z-10 mb-16"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          KIITO. <span className="text-gradient">Focus Redefined.</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          The ultimate academic command center built for focus and clarity.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 160, rotateX: 25, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          scale: phoneScale,
          y: phoneScrollY,
          opacity: phoneOpacity,
          rotateX: phoneRotateX,
        }}
        className="relative z-10"
      >
        <div
          className="absolute -inset-24 rounded-full pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(circle, hsla(25, 100%, 50%, 0.18) 0%, transparent 55%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          animate={{
            y: [0, -24, 0],
            rotateZ: [0, 4, 0, -4, 0],
            scale: [1, 0.96, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          style={{
            transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${shiftX}px, ${shiftY}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          <PhoneFrame>
            <DashboardScreen />
          </PhoneFrame>

          <motion.div
            className="absolute -top-8 -right-24 w-40 rounded-xl border border-border/30 bg-card/80 backdrop-blur-md p-3 shadow-xl hidden md:block"
            initial={{ opacity: 0, scale: 0.5, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.1, rotateY: -5 }}
            style={{
              transform: `perspective(800px) rotateX(${cursor.normalizedY * -6}deg) rotateY(${cursor.normalizedX * 8}deg) translate(${cursor.normalizedX * 14}px, ${cursor.normalizedY * 10}px)`,
              transformStyle: "preserve-3d",
              boxShadow: "0 8px 32px -4px hsla(25, 100%, 50%, 0.1), 0 4px 16px -2px rgba(0,0,0,0.5)",
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotateZ: [-1, 1, -1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
                Next Class
              </div>
              <div className="text-[11px] font-semibold text-foreground mt-1">
                Linear Algebra
              </div>
              <div className="text-[9px] text-primary mt-0.5">in 25 min</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -bottom-6 -left-20 w-36 rounded-xl border border-border/30 bg-card/80 backdrop-blur-md p-3 shadow-xl hidden md:block"
            initial={{ opacity: 0, scale: 0.5, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.1, rotateY: 5 }}
            style={{
              transform: `perspective(800px) rotateX(${cursor.normalizedY * -5}deg) rotateY(${cursor.normalizedX * 7}deg) translate(${cursor.normalizedX * -12}px, ${cursor.normalizedY * -10}px)`,
              transformStyle: "preserve-3d",
              boxShadow: "0 8px 32px -4px hsla(25, 100%, 50%, 0.08), 0 4px 16px -2px rgba(0,0,0,0.4)",
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0], rotateZ: [1, -1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
                Today
              </div>
              <div className="text-[11px] font-semibold text-foreground mt-1">
                4 Classes
              </div>
              <div className="text-[9px] text-muted-foreground mt-0.5">
                2 completed
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
