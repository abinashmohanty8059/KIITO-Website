import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

const PhoneFrame = ({ children, className = "" }: PhoneFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[280px] h-[580px] rounded-[40px] border-[3px] border-border/40 bg-background phone-shadow overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-background rounded-b-2xl z-10" />

        <div className="w-full h-full rounded-[37px] overflow-hidden bg-background relative">
          {children}
        </div>

        <div
          className="absolute inset-0 rounded-[37px] pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(125deg, hsla(0, 0%, 100%, 0.07) 0%, transparent 40%, transparent 60%, hsla(0, 0%, 100%, 0.03) 100%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-[37px] pointer-events-none z-20 phone-reflection"
        />
      </div>
    </div>
  );
};

export default PhoneFrame;
