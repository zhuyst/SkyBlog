package indi.zhuyst.skyblog.service;

import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.pojo.About;

public interface AboutService extends CacheableService{

    int ABOUT_KEY = 2;

    String CACHE_OBJECT = CACHE_PREFIX + "about";

    About getAbout();

    About updateAbout(About about);
}
