import {createConfirmation} from "react-confirm";
import ConfirmModal from "./common/modal/ConfirmModal";

export const convertBr = text => {
    return text.replace(new RegExp("\n","gm"),"<br/>");
};

const createConfirm = createConfirmation(ConfirmModal);

export const confirm = confirmation => {
    return createConfirm({
        confirmation : confirmation
    })
};