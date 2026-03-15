import widgetImg from "@/assets/widget.png";

const WidgetScreen = () => {
  return (
    <div className="w-full h-full">
      <img src={widgetImg} alt="KIITO widget showing ongoing and upcoming classes" className="w-full h-full object-cover" />
    </div>
  );
};

export default WidgetScreen;
