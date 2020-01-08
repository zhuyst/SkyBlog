import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
  autoClose: 3000,
};

function info(message) {
  return toast.info(message, options);
}

function success(message) {
  return toast.success(message, options);
}

function error(message) {
  return toast.error(message, options);
}

export default {
  info, success, error,
};
