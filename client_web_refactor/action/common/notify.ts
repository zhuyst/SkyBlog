import {addNotification as notify, POSITIONS, STATUS} from "reapop";

export const info = (message: string) => {
    return notify({
        message,
        status : STATUS.info,
        position : POSITIONS.topCenter,
        closeButton : true,
    });
};

export const success = (message: string) => {
    return notify({
        message,
        status : STATUS.success,
        position : POSITIONS.topCenter,
        closeButton : true,
    });
};

export const error = (message: string)  => {
    return notify({
        message,
        status : STATUS.error,
        position : POSITIONS.topCenter,
        closeButton : true,
    });
};
