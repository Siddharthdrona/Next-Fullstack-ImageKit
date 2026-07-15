"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

interface NotificationState {
  id: number;
  message: string;
  type: NotificationType;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationState | null>(
    null,
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = (
    message: string,
    type: NotificationType = "info",
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const id = Date.now();

    setNotification({
      id,
      message,
      type,
    });

    timeoutRef.current = setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };

  const closeNotification = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification && (
        <div className="toast toast-top toast-end z-9999">
          <div
            className={`alert ${getAlertClass(
              notification.type,
            )} shadow-lg flex items-center justify-between min-w-[320px]`}
          >
            <span>{notification.message}</span>

            <button
              onClick={closeNotification}
              className="ml-4 text-lg font-bold hover:opacity-70"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

function getAlertClass(type: NotificationType) {
  switch (type) {
    case "success":
      return "alert-success";

    case "error":
      return "alert-error";

    case "warning":
      return "alert-warning";

    case "info":
    default:
      return "alert-info";
  }
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider.",
    );
  }

  return context;
}
