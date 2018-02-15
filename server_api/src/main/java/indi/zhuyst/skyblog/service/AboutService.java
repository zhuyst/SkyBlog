package indi.zhuyst.skyblog.service;

import indi.zhuyst.skyblog.pojo.About;

public interface AboutService {

    int ABOUT_KEY = 2;

    About getAbout();

    About updateAbout(About about);
}
