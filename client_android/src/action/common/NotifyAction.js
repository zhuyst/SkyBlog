import {addNotification as notify,STATUS,POSITIONS} from 'reapop';

export const info = message => {
    return notify({
        message : message,
        status : STATUS.info,
        position : POSITIONS.topCenter,
        closeButton : true
    })
};

export const success = message => {
    return notify({
        message : message,
        status : STATUS.success,
        position : POSITIONS.topCenter,
        closeButton : true
    })
};

export const error = message  => {
    return notify({
        message : message,
        status : STATUS.error,
        position : POSITIONS.topCenter,
        closeButton : true
    })
};