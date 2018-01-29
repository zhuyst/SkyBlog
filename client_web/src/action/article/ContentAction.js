export const EDIT_CONTENT = "EDIT_CONTENT";
export const SET_ARTICLE = "SET_ARTICLE";

export const editContent = editing => {
    return {
        type : EDIT_CONTENT,
        editing : editing
    }
};

export const setArticle = article => {
    return {
        type : SET_ARTICLE,
        article : article
    }
};