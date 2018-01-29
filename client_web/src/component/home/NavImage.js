import React from 'react'
import { Carousel } from 'react-bootstrap'

import image1 from '../../static/images/1.jpg'
import image2 from '../../static/images/2.jpg'
import image3 from '../../static/images/3.jpg'

class NavImage extends React.Component{
    render(){
        return (
            <Carousel className="navImage">
                <Carousel.Item className="navImage">
                    <img height={300} alt="" src={image1}/>
                    <Carousel.Caption>
                        <h3>第一张图片</h3>
                        <p>第一张图片的介绍</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="navImage">
                    <img height={300} alt="" src={image2}/>
                    <Carousel.Caption>
                        <h3>第二张图片</h3>
                        <p>第二张图片的介绍</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="navImage">
                    <img height={300} alt="" src={image3}/>
                    <Carousel.Caption>
                        <h3>第三张图片</h3>
                        <p>第三张图片的介绍</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}

export default NavImage