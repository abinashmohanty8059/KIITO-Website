import scheduleImg from "@/assets/schedule.png";

const ScheduleScreen = () => {
  return (
    <div className="w-full h-full">
      <img src={scheduleImg} alt="KIITO weekly schedule view" className="w-full h-full object-cover" />
    </div>
  );
};

export default ScheduleScreen;
