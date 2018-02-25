import React from 'react'
import {Button, Glyphicon} from "react-bootstrap";
import {SKY_BLOG_URL} from "../../Constant";

class Footer extends React.Component{
    render(){
        const url = SKY_BLOG_URL;

        return (
            <div className="footer">
                <p>Powered by <a href={url}>SkyBlog</a></p>
                <p>麻烦各位大爷&nbsp;&nbsp;
                    <Button bsSize="small" className="star_button"
                            href={url} target="_blank">
                        <Glyphicon glyph="star" />
                        Star
                    </Button>
                    &nbsp;&nbsp;一个吧
                </p>
            </div>
        )
    }
}

export default Footer