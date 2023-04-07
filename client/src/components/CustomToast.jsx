import { toast } from "react-hot-toast";

const CustomToast = ({ message }) => {
  return (
    <div style={{ backgroundColor: "green", color: "white", padding: "10px" }}>
      {message}
    </div>
  );
};

const handleCustomToast = () => {
  toast.custom((t) => <CustomToast message="This is a custom toast!" />);
};

export { CustomToast, handleCustomToast };
