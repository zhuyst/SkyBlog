export const convertBr = text => {
    return text.replace(new RegExp("\n","gm"),"<br/>");
};