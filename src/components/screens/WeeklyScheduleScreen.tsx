import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const selectedDay = 0;

const schedule = [
  { time: "9:00", name: "Data Structures", duration: "1.5h", color: "bg-primary" },
  { time: "11:00", name: "Linear Algebra", duration: "1h", color: "bg-emerald-500" },
  { time: "14:00", name: "Physics Lab", duration: "2h", color: "bg-sky-500" },
  { time: "16:00", name: "English Lit.", duration: "1h", color: "bg-violet-500" },
];

const WeeklyScheduleScreen = () => {
  return (
    <div className="h-full bg-background p-5 pt-10 flex flex-col gap-3">
      <p className="text-sm font-bold text-foreground">Weekly Schedule</p>

      <div className="flex gap-2 mb-1">
        {days.map((d, i) => (
          <motion.div
            key={d}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className={`flex-1 py-1.5 rounded-lg text-center text-[10px] font-semibold ${
              i === selectedDay ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {d}
          </motion.div>
        ))}
      </div>

      {schedule.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex gap-3 items-start"
        >
          <span className="text-[10px] text-muted-foreground w-10 pt-1 shrink-0">{s.time}</span>
          <div className="flex-1 rounded-xl bg-card border border-border p-3 relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.color}`} />
            <p className="text-xs font-semibold text-foreground ml-2">{s.name}</p>
            <p className="text-[10px] text-muted-foreground ml-2 mt-0.5">{s.duration}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WeeklyScheduleScreen;
