import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCursorParallax } from "@/hooks/use-cursor-parallax";

const techCategories = [
  {
    title: "Language",
    items: ["Kotlin 2.0+"],
    icon: "⚡",
  },
  {
    title: "UI Toolkit",
    items: ["Jetpack Compose", "Material 3", "Glance Widgets"],
    icon: "🎨",
  },
  {
    title: "Architecture",
    items: ["Clean Architecture", "MVVM", "Repository Pattern"],
    icon: "🏗️",
  },
  {
    title: "Dependency Injection",
    items: ["Hilt (Dagger)"],
    icon: "🔗",
  },
  {
    title: "Asynchronous",
    items: ["Kotlin Coroutines", "Flow"],
    icon: "⏳",
  },
  {
    title: "Networking",
    items: ["OkHttp", "Retrofit"],
    icon: "🌐",
  },
  {
    title: "Persistence",
    items: ["Room (SQLite)", "Proto DataStore", "DataStore Preferences"],
    icon: "💾",
  },
  {
    title: "Background Jobs",
    items: ["WorkManager", "AlarmManager"],
    icon: "⚙️",
  },
  {
    title: "Security",
    items: ["Android Keystore", "EncryptedSharedPreferences"],
    icon: "🔐",
  },
];

const archLayers = [
  { label: "Presentation", detail: "Jetpack Compose + Material 3", color: "hsla(25, 100%, 50%, 0.8)" },
  { label: "Domain", detail: "Use Cases + Business Logic", color: "hsla(25, 100%, 55%, 0.6)" },
  { label: "Data", detail: "Repository + Room + DataStore", color: "hsla(25, 100%, 60%, 0.4)" },
  { label: "Network", detail: "OkHttp + Retrofit + Scraping", color: "hsla(25, 100%, 65%, 0.3)" },
];

const EngineeringSection = () => {
  const cursor = useCursorParallax();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgRotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const bgRotateY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full pointer-events-none"
        style={{
          opacity: 0.12,
          background: "radial-gradient(circle, hsla(25, 100%, 50%, 0.2) 0%, hsla(25, 100%, 50%, 0.04) 30%, transparent 60%)",
          transform: `translate(calc(-50% + ${cursor.normalizedX * 25}px), calc(-50% + ${cursor.normalizedY * 25}px))`,
          filter: "blur(80px)",
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, hsla(220, 80%, 50%, 0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
          transform: `translate(${cursor.normalizedX * -15}px, ${cursor.normalizedY * -15}px)`,
        }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-24"
          style={{ perspective: "1000px" }}
        >
          <motion.span
            className="text-xs uppercase tracking-[0.3em] text-primary font-medium inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Engineering
          </motion.span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mt-4">
            Built with <span className="text-gradient">Precision</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base md:text-lg">
            Clean architecture, modern tooling, zero compromise on performance.
          </p>
        </motion.div>

        <motion.div
          className="mb-24"
          style={{
            perspective: "1200px",
          }}
        >
          <motion.div
            className="max-w-2xl mx-auto space-y-3"
            style={{
              rotateX: bgRotateX,
              rotateY: bgRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {archLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -100, rotateY: -20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="relative group"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${(archLayers.length - i) * 8}px)`,
                }}
              >
                <div
                  className="relative rounded-xl border border-border/20 bg-card/60 backdrop-blur-sm px-6 py-4 flex items-center justify-between overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:scale-[1.02]"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                    style={{ background: layer.color }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(90deg, ${layer.color.replace(')', ', 0.08)')} 0%, transparent 60%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <h4 className="text-sm md:text-base font-semibold text-foreground">{layer.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{layer.detail}</p>
                  </div>
                  <motion.div
                    className="text-xs text-primary/60 font-mono relative z-10"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    Layer {i}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {techCategories.map((cat, i) => {
            const tiltX = cursor.normalizedY * -5;
            const tiltY = cursor.normalizedX * 5;

            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 80, rotateX: 25, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{
                  scale: 1.05,
                  rotateX: -3,
                  rotateY: 3,
                  z: 30,
                  transition: { duration: 0.4 },
                }}
                className="group relative"
                style={{
                  perspective: "800px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative rounded-2xl border border-border/15 bg-card/50 backdrop-blur-sm p-5 h-full overflow-hidden transition-colors duration-500 group-hover:border-primary/30"
                  style={{
                    transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, hsla(25, 100%, 50%, 0.12) 0%, transparent 60%)",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, hsla(25, 100%, 50%, 0.04) 50%, transparent 100%)",
                      backgroundSize: "100% 200%",
                    }}
                    animate={{ backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{cat.icon}</span>
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        {cat.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item, j) => (
                        <motion.span
                          key={item}
                          className="text-[10px] md:text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground border border-border/10"
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.08 + j * 0.06 }}
                          viewport={{ once: true }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringSection;
