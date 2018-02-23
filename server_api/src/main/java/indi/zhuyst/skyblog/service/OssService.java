package indi.zhuyst.skyblog.service;

import indi.zhuyst.skyblog.pojo.OssFile;
import org.springframework.web.multipart.MultipartFile;

public interface OssService {

    OssFile upload(MultipartFile file);
}
