import {LIST_ARTICLES_RESPONSE} from "../../action/ArticlesAction";

const initialState = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0
};

const ArticlesReducer = (state = initialState,action) => {
    switch (action.type){
        case LIST_ARTICLES_RESPONSE:
            const page = action.page;

            const stateList = state.list;
            const resultList = page.list;
            let newList;
            if(stateList.length < page.page_size){
                newList = stateList.concat(resultList);
            }
            else {
                newList = stateList.concat([]);
                for(let i = 0;i < resultList.length;i++){
                    let isRepeat = false;

                    for(let j = stateList.length - page.page_size;
                        j < stateList.length;j++){
                        console.log(i + "--" + j);
                        if(resultList[i].id === stateList[j].id){
                            isRepeat = true;
                            break;
                        }
                    }

                    if(!isRepeat){
                        newList.push(resultList[i]);
                    }
                }
            }

            return {
                ...state,
                list : newList,
                page_num : page.page_num,
                pages : page.pages,
                total : page.total
            };
        default :
            return state;
    }
};

export default ArticlesReducer