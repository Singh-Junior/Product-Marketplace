import { useAlert } from "./useAlert";
import "../styles/alerts.scss";
import { X } from "lucide-react";

const AlertStack = () => {
  const { alerts, removeAlert } = useAlert();

  return (
    <div className="alert-wrapper">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert ${alert.type}`}
          style={{
            top: alert.type === "success" ? undefined : "auto",
            bottom: alert.type !== "success" ? "1rem" : undefined,
            left: alert.type !== "success" ? "1rem" : "50%",
            transform:
              alert.type === "success" ? "translateX(-50%)" : "none",
          }}
        >
          <span>{alert.message}</span>
          <X onClick={() => removeAlert(alert.id)} className="close" />
        </div>
      ))}
    </div>
  );
};

export default AlertStack;
