import { motion } from "framer-motion";
import { Bell, BookOpen, Clock } from "lucide-react";

const DashboardScreen = () => {
  return (
    <div className="h-full bg-background p-5 pt-10 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Good Morning</p>
          <p className="text-sm font-semibold text-foreground">Alex Johnson</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <Bell className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-primary/10 border border-primary/20 p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Now</span>
        </div>
        <p className="text-sm font-semibold text-foreground">Data Structures</p>
        <p className="text-xs text-muted-foreground mt-1">Room 204 · Prof. Williams</p>
        <div className="flex items-center gap-1 mt-2">
          <Clock className="w-3 h-3 text-primary" />
          <span className="text-[10px] text-primary font-medium">Ends in 45 min</span>
        </div>
      </motion.div>

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upcoming</p>

      {[
        { name: "Linear Algebra", time: "11:00 AM", room: "Hall B" },
        { name: "Physics Lab", time: "2:00 PM", room: "Lab 3" },
        { name: "English Lit.", time: "4:00 PM", room: "Room 101" },
      ].map((cls, i) => (
        <motion.div
          key={cls.name}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 rounded-xl bg-card border border-border p-3"
        >
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">{cls.name}</p>
            <p className="text-[10px] text-muted-foreground">{cls.room}</p>
          </div>
          <span className="text-[10px] text-muted-foreground">{cls.time}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardScreen;
