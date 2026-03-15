import { motion } from "framer-motion";
import { useCursorParallax } from "@/hooks/use-cursor-parallax";
import MagneticButton from "./MagneticButton";

const CTASection = () => {
  const cursor = useCursorParallax();

  return (
    <section className="relative py-40 md:py-56 px-6 overflow-hidden" style={{ perspective: "1200px" }}>
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, hsla(25, 100%, 50%, 0.22) 0%, hsla(25, 100%, 50%, 0.05) 30%, transparent 60%)",
          transform: `translate(calc(-50% + ${cursor.normalizedX * 20}px), calc(-50% + ${cursor.normalizedY * 20}px))`,
          filter: "blur(40px)",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, hsla(220, 60%, 50%, 0.2) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 50, 0, -50, 0], y: [0, -30, 0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 15, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center relative z-10"
      >
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          Focus on what matters.
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mt-5 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Let KIITO organize the rest.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <MagneticButton className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-[0_0_60px_hsla(25,100%,50%,0.5)] relative overflow-hidden group">
            <span className="relative z-10">Download KIITO</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
            />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
