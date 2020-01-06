import { addNotification as notify, STATUS, POSITIONS } from "reapop";

function info(message) {
  return notify({
    message,
    status: STATUS.info,
    position: POSITIONS.topCenter,
    closeButton: true,
  });
}

function success(message) {
  return notify({
    message,
    status: STATUS.success,
    position: POSITIONS.topCenter,
    closeButton: true,
  });
}

function error(message) {
  return notify({
    message,
    status: STATUS.error,
    position: POSITIONS.topCenter,
    closeButton: true,
  });
}

export default {
  info, success, error,
};
