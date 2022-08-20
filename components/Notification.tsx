import { FC, useEffect, useState } from "react";

interface Props {
  message?: string;
  type?: Notifications;
}
export type Notifications = "error" | "success" | "warning";

let timeoutId: NodeJS.Timer;
const Notification: FC<Props> = ({ message, type }): JSX.Element | null => {
  const [notification, setNotification] = useState<string>("");
  const [classes, setClasses] = useState<string>("");

  const updateNotification = (type: Notifications, value: string) => {
    if (timeoutId) clearTimeout(timeoutId);

    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value);

    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  useEffect(() => {
    if (message && type) updateNotification(type, message);
  }, [message, type]);

  if (!notification) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-24 z-50">
      <div className="bounce-custom shadow-md shadow-gray-400 rounded">
        <p className={classes + " text-white px-4 py-2 font-semibold"}>
          {notification}
        </p>
      </div>
    </div>
  );
};

export default Notification;
