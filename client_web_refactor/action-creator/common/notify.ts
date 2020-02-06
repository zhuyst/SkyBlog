import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
  autoClose: 3000,
};

function info(message: string) {
  return toast.info(message, options);
}

function success(message: string) {
  return toast.success(message, options);
}

function error(message: string) {
  return toast.error(message, options);
}

export default {
  info, success, error,
};
