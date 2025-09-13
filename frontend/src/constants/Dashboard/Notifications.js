import { Camera, CheckCircle2, FileText, Zap } from "lucide-react";

export const notifications = [
  {
    id: 1,
    type: "upload",
    message: "New site photos uploaded",
    time: "2 hours ago",
    icon: Camera,
  },
  {
    id: 2,
    type: "work",
    message: "Kitchen work completed",
    time: "5 hours ago",
    icon: CheckCircle2,
  },
  {
    id: 3,
    type: "ongoing",
    message: "Electrical wiring in progress",
    time: "1 day ago",
    icon: Zap,
  },
  {
    id: 4,
    type: "upload",
    message: "Progress report submitted",
    time: "2 days ago",
    icon: FileText,
  },
];
