import { toast } from "react-toastify";

function info(message) {
  return toast.info(message);
}

function success(message) {
  return toast.success(message);
}

function error(message) {
  return toast.error(message);
}

export default {
  info, success, error,
};
