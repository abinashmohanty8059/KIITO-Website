import { motion } from "framer-motion";
import { Bell, BookOpen, AlertCircle, Calendar } from "lucide-react";

const notifications = [
  { icon: AlertCircle, title: "Class Starting Soon", desc: "Data Structures in 15 minutes", time: "2 min ago", urgent: true },
  { icon: BookOpen, title: "Assignment Due", desc: "Linear Algebra Problem Set #4", time: "1 hour ago", urgent: false },
  { icon: Calendar, title: "Schedule Change", desc: "Physics Lab moved to Lab 5", time: "3 hours ago", urgent: false },
  { icon: Bell, title: "Reminder", desc: "Office hours at 3 PM today", time: "5 hours ago", urgent: false },
  { icon: BookOpen, title: "New Material", desc: "English Lit. notes uploaded", time: "Yesterday", urgent: false },
];

const NotificationsScreen = () => {
  return (
    <div className="h-full bg-background p-5 pt-10 flex flex-col gap-3">
      <p className="text-sm font-bold text-foreground">Notifications</p>
      <p className="text-[10px] text-muted-foreground mb-1">Stay on top of everything</p>

      {notifications.map((n, i) => (
        <motion.div
          key={i}
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          className={`rounded-xl border p-3 flex gap-3 items-start ${n.urgent ? "bg-primary/5 border-primary/20" : "bg-card border-border"}`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${n.urgent ? "bg-primary/15" : "bg-muted"}`}>
            <n.icon className={`w-3.5 h-3.5 ${n.urgent ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-foreground">{n.title}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{n.desc}</p>
          </div>
          <span className="text-[9px] text-muted-foreground shrink-0">{n.time}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default NotificationsScreen;
