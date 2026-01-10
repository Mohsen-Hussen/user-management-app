import React from "react";
import checkIcon from "@/app/assets/check-icon.svg";
import absentIcon from "@/app/assets/absent-icon.svg";
import type { StatusIconProps } from "@/app/types";

export const StatusIcon: React.FC<StatusIconProps> = ({ status, className = "" }) => {
  return (
    <img
      src={status === "active" ? checkIcon : absentIcon}
      alt={status === "active" ? "Active" : "Absent"}
      className={className}
    />
  );
};

export default StatusIcon;
