package indi.zhuyst.skyblog.util;

/**
 * String处理工具
 * @author zhuyst
 */
public class StringUtils extends org.apache.commons.lang3.StringUtils{

    /**
     * 去除HTML标签
     * @param text 要去除HTML标签的文本
     * @return 去除了HTML标签的文本
     */
    public static String removeHtmlTag(String text){
        text = text.replaceAll("</?[^>]+>", "");
        return text;
    }
}
