package indi.zhuyst.common.util;

import com.github.pagehelper.PageInfo;
import org.springframework.beans.BeanUtils;

import java.util.List;

/**
 * 分页工具类
 * @author zhuyst
 */
public class PageUtils {

    /**
     * 拷贝分页对象信息到新的分页对象当中
     * @param pageInfo 要被拷贝的分页对象
     * @param list 拷贝的List对象
     * @param <T> 拷贝后的集合对象类型
     * @return 拷贝后的分页对象
     */
    public static <T> PageInfo<T> copyNewInfo(PageInfo pageInfo, List<T> list){
        PageInfo<T> returnPageInfo = new PageInfo<>();
        BeanUtils.copyProperties(pageInfo,returnPageInfo,"list");
        returnPageInfo.setList(list);
        return returnPageInfo;
    }
}
