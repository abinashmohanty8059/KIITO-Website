import notificationImg from "@/assets/notification.png";

const NotificationScreen = () => {
  return (
    <div className="w-full h-full">
      <img src={notificationImg} alt="KIITO smart notifications" className="w-full h-full object-cover" />
    </div>
  );
};

export default NotificationScreen;
