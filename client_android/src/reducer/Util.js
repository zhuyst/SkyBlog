export const concatList = (page,stateList) => {
    const resultList = page.list;

    let newList;
    // 如果页码为1，这说明需要reload
    if(page.page_num === 1){
        newList = resultList;
    }
    else {
        // 由于有可能出现重复元素，破坏React遍历唯一性
        // 所以要进行数组合并查重
        if(stateList.length < page.page_size){
            newList = stateList.concat(resultList);
        }
        else {
            newList = stateList.concat([]);
            for(let i = 0;i < resultList.length;i++){
                let isRepeat = false;

                // 由于数组只有可能在后面page_size范围内出现重复元素
                // 所以只需要扫描这个范围进行去重即可
                for(let j = stateList.length - page.page_size;
                    j < stateList.length;j++){
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
    }

    return newList;
};