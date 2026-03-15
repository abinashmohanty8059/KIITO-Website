import { motion } from "framer-motion";
import { MapPin, Clock, User } from "lucide-react";

const classes = [
  { name: "Data Structures", prof: "Prof. Williams", room: "Room 204", time: "9:00 AM", color: "bg-primary" },
  { name: "Linear Algebra", prof: "Dr. Chen", room: "Hall B", time: "11:00 AM", color: "bg-emerald-500" },
  { name: "Physics Lab", prof: "Prof. Gupta", room: "Lab 3", time: "2:00 PM", color: "bg-sky-500" },
  { name: "English Literature", prof: "Ms. Parker", room: "Room 101", time: "4:00 PM", color: "bg-violet-500" },
];

const ClassTrackingScreen = () => {
  return (
    <div className="h-full bg-background p-5 pt-10 flex flex-col gap-3">
      <p className="text-sm font-bold text-foreground">Today's Classes</p>
      <p className="text-[10px] text-muted-foreground mb-1">Monday, March 12</p>

      {classes.map((cls, i) => (
        <motion.div
          key={cls.name}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-xl bg-card border border-border p-3 flex gap-3"
        >
          <div className={`w-1 rounded-full ${cls.color}`} />
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">{cls.name}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <User className="w-3 h-3" /> {cls.prof}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="w-3 h-3" /> {cls.room}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" /> {cls.time}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ClassTrackingScreen;
