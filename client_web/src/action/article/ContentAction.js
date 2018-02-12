export const SET_ARTICLE = "SET_ARTICLE";

export const setArticle = article => {
    return {
        type : SET_ARTICLE,
        article : article
    }
};