import { IPageInfo } from "@/action/common";
import { IBaseEntity } from "@/api";

export function concatList<T extends IBaseEntity>(page: IPageInfo<T>, stateList: T[]): T[] {
  const resultList = page.list;

  // 如果页码为1，这说明需要reload
  if (page.pageNum === 1) {
    return resultList;
  }

  // 由于有可能出现重复元素，破坏React遍历唯一性
  // 所以要进行数组合并查重
  if (stateList.length < page.pageSize) {
    return stateList.concat(resultList);
  }

  const newList = stateList.concat([]);
  resultList.forEach((result) => {
    let isRepeat = false;

    // 由于数组只有可能在后面page_size范围内出现重复元素
    // 所以只需要扫描这个范围进行去重即可
    for (let j = stateList.length - page.pageSize; j < stateList.length; j++) {
      if (result.id === stateList[j].id) {
        isRepeat = true;
        break;
      }
    }

    if (!isRepeat) {
      newList.push(result);
    }
  });

  return newList;
}
