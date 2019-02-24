import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

import home from '../../static/images/home.jpg';
import { GITHUB_URL, SKY_BLOG_URL } from '../../Constant';

class NavImage extends React.Component {
  render() {
    const skyblog_url = SKY_BLOG_URL;
    const github_url = GITHUB_URL;

    return (
      <Carousel className="nav_image">
        <Carousel.Item className="nav_image">
          <div className="nav_image_text">
            <h1>Sky&nbsp;Blog</h1>
            <div className="hidden-xs">
              <hr />
              <h3>一个将阅读与管理合一的轻量级博客</h3>
            </div>
          </div>
          <div className="nav_image_button_group">
            <div className="hidden-xs">
              <Button bsSize="large"
                target="_blank"
                href={skyblog_url}
              >
查看SkyBlog源码
              </Button>
              <Button bsSize="large"
                target="_blank"
                href={github_url}
              >
查看作者Github
              </Button>
            </div>
            <div>
              <div className="hidden-sm hidden-md hidden-lg">
                <Button bsSize="small"
                  target="_blank"
                  href={skyblog_url}
                >
查看SkyBlog源码
                </Button>
                <Button bsSize="small"
                  target="_blank"
                  href={github_url}
                >
查看作者Github
                </Button>
              </div>
            </div>
          </div>
          <img height={300} alt="" src={home} />
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default NavImage;
