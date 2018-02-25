import React from 'react'
import {Button, Carousel} from 'react-bootstrap'

import home from '../../static/images/home.jpg'

class NavImage extends React.Component{
    render(){
        return (
            <Carousel className="nav_image">
                <Carousel.Item className="nav_image">
                    <div className="nav_image_text">
                        <h1>Sky&nbsp;Blog</h1>
                        <div className="hidden-xs">
                            <hr/>
                            <h3>一个将阅读与管理合一的轻量级博客</h3>
                        </div>
                    </div>
                    <div className="nav_image_button_group">
                        <Button bsSize="large">查看SkyBlog源码</Button>
                        <Button bsSize="large">查看作者Github</Button>
                    </div>
                    <img height={300} alt="" src={home}/>
                </Carousel.Item>
            </Carousel>
        )
    }
}

export default NavImage