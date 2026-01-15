export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "error";
  read: boolean;
  timestamp: Date;
}

export interface AppMessage {
  value: string;
  type: "success" | "danger" | "warning" | "info";
}
