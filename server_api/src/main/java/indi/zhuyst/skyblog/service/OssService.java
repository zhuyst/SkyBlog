package indi.zhuyst.skyblog.service;

import indi.zhuyst.skyblog.pojo.OssFile;
import org.springframework.web.multipart.MultipartFile;

/**
 * 阿里云OSS服务接口
 * @author zhuyst
 */
public interface OssService {

    /**
     * 上传文件
     * @param file 文件
     * @return 文件URL
     */
    OssFile upload(MultipartFile file);
}
