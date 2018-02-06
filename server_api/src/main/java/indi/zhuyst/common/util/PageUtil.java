package indi.zhuyst.common.util;

import com.github.pagehelper.PageInfo;

import java.util.List;

public class PageUtil {

    public static <T> PageInfo<T> copyNewInfo(PageInfo pageInfo, List<T> list){
        PageInfo<T> returnPageInfo = new PageInfo<>(list);

        returnPageInfo.setPages(pageInfo.getPages());
        returnPageInfo.setPageSize(pageInfo.getPageSize());
        returnPageInfo.setTotal(pageInfo.getTotal());
        returnPageInfo.setPageNum(pageInfo.getPageNum());

        return returnPageInfo;
    }
}
