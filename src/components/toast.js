import toast from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      border: "1px solid #e48700",
      padding: "16px",
      color: "#000000",
    },
    iconTheme: {
      primary: "#e48700",
      secondary: "#FFFAEE",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      border: "1px solid red",
      padding: "16px",
      color: "#000000",
    },
    iconTheme: {
      primary: "red",
      secondary: "#FFFAEE",
    },
  });
};
