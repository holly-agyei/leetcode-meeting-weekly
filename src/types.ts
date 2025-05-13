export interface ScheduleItem {
  day: string;
  session: string;
  description: string;
  name: string;
}

export interface ScheduleRowProps {
  item: ScheduleItem;
  onUpdate: (day: string, name: string) => void;
}

export interface ScheduleTableProps {
  schedule: ScheduleItem[];
  onUpdate: (day: string, name: string) => void;
} 