import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPowerOff, FaWifi } from "react-icons/fa";
import { BsWifiOff } from "react-icons/bs";
import "../Styles/offline.scss";

const OfflineToast = () => (
  <div className="notifier">
    <BsWifiOff style={{ marginRight: "5px" }} />
    You're offline
  </div>
);

const OnlineToast = () => (
  <div className="notifier">
    <FaWifi style={{ marginRight: "5px" }} />
    Back online
  </div>
);

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // const toast = useToaster();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success(<OnlineToast />);
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error(<OfflineToast />);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

const Offline = () => {
  return (
    <div className="app__offline ">
      <p>Currently</p>
      <h1>
        <FaPowerOff />
        FFLINE
      </h1>
    </div>
  );
};

export { useOnlineStatus, Offline };
