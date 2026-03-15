import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCursorParallax } from "@/hooks/use-cursor-parallax";

import teamAbinash from "@/assets/team-abinash.jpeg";
import teamHarsh from "@/assets/team-harsh.jpeg";
import teamPratyusha from "@/assets/team-pratyusha.jpeg";
import teamSubham from "@/assets/team-subham.jpeg";
import teamShanu from "@/assets/team-shanu.jpeg";
import teamYogisha from "@/assets/team-yogisha.jpeg";

const teamMembers = [
  { name: "Subham Shah", role: "Core Developer", image: teamSubham },
  { name: "Shanu", role: "Core Developer", image: teamShanu },
  { name: "Pratyusha Mohanty", role: "Core Developer", image: teamPratyusha },
  { name: "Yogisha Rani", role: "Core Developer", image: teamYogisha },
  { name: "Abinash Mohanty", role: "Core Developer", image: teamAbinash },
  { name: "Harsh Singh", role: "Core Developer", image: teamHarsh },
];

const TeamSection = () => {
  const cursor = useCursorParallax();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsla(25, 100%, 50%, 0.15) 0%, transparent 55%)",
          transform: `translate(calc(-50% + ${cursor.normalizedX * 20}px), calc(-50% + ${cursor.normalizedY * 20}px))`,
          filter: "blur(70px)",
        }}
      />
      <motion.div
        className="floating-blob w-[300px] h-[300px] top-[10%] left-[10%] opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, hsla(220, 70%, 50%, 0.2) 0%, transparent 65%)",
        }}
        animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10" style={{ perspective: "1200px" }}>
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            className="text-xs uppercase tracking-[0.3em] text-primary font-medium inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Team
          </motion.span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mt-4">
            Core <span className="text-gradient">Developers</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto text-base">
            The people building the future of academic productivity.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7"
          style={{ rotateX: gridRotateX, y: gridY, transformStyle: "preserve-3d" }}
        >
          {teamMembers.map((member, i) => {
            const tiltX = cursor.normalizedY * -6;
            const tiltY = cursor.normalizedX * 6;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 100, rotateX: 25, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.06,
                  rotateY: 5,
                  z: 40,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                className="group relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden border border-border/20 bg-card/40 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/40"
                  style={{
                    transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl z-10"
                    style={{
                      background: "radial-gradient(circle at 50% 30%, hsla(25, 100%, 50%, 0.2) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl z-10"
                    style={{
                      boxShadow: "inset 0 1px 0 0 hsla(25, 100%, 50%, 0.3), inset 0 -1px 0 0 hsla(25, 100%, 50%, 0.1)",
                    }}
                  />

                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background via-background/70 to-transparent p-4 pt-16">
                      <h3 className="text-sm md:text-base font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-xs text-primary mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
