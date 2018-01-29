package indi.zhuyst.common.util;

import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageRowBounds;

import java.util.List;

public class PageUtil {

    //如果pageNum为null，查询所有记录
    public static PageRowBounds getPageRowBounds(Integer pageNum, Integer pageSize){
        PageRowBounds bounds;

        //如果pageNum为null，查询所有记录
        if(pageNum == null){
            bounds = new PageRowBounds(0,0);
        }
        else {
            bounds = new PageRowBounds(pageNum,pageSize);
        }

        return bounds;
    }

    public static <T> PageInfo<T> copyNewInfo(PageInfo pageInfo, List<T> list){
        PageInfo<T> returnPageInfo = new PageInfo<>(list);

        returnPageInfo.setPages(pageInfo.getPages());
        returnPageInfo.setPageSize(pageInfo.getPageSize());
        returnPageInfo.setTotal(pageInfo.getTotal());
        returnPageInfo.setPageNum(pageInfo.getPageNum());

        return returnPageInfo;
    }
}
