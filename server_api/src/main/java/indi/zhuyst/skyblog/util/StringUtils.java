package indi.zhuyst.skyblog.util;

public class StringUtils extends org.apache.commons.lang3.StringUtils{
    public static String removeHtmlTag(String text){
        text = text.replaceAll("</?[^>]+>", "");
        return text;
    }
}
