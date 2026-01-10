import React from "react";
import mondayDotCom from "@/app/assets/Monday.com.svg";
import notion from "@/app/assets/Notion.svg";
import spotify from "@/app/assets/Spotify.svg";
import loom from "@/app/assets/Loom.svg";
import formcarry from "@/app/assets/Formcarry.svg";
import dropbox from "@/app/assets/Dropbox.svg";
import tidal from "@/app/assets/Tidal.svg";
import type { ProjectIconProps } from "@/app/types";

const iconMap: Record<string, string> = {
  monday: mondayDotCom,
  notion: notion,
  spotify: spotify,
  loom: loom,
  formcarry: formcarry,
  dropbox: dropbox,
  tidal: tidal,
};

export const ProjectIcon: React.FC<ProjectIconProps> = ({ iconKey, className = "" }) => {
  const iconSrc = iconMap[iconKey];

  if (!iconSrc) return null;

  return <img src={iconSrc} alt={iconKey} className={className} />;
};

export default ProjectIcon;
