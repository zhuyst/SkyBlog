import React from 'react'
import {Button, Glyphicon} from "react-bootstrap";
import {SKY_BLOG_URL} from "../../Constant";
import {connect} from "react-redux";

class Footer extends React.Component{
    render(){
        const count = this.props.count;
        const url = SKY_BLOG_URL;

        return (
            <div className="footer">
                <p>网页访问次数：{count === 0 ? "加载中..." : count}</p>
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

const mapStateToDispatch = state => {
    return {
        count : state.access_log.count
    }
};

const FooterContainer = connect(
    mapStateToDispatch,
    null
)(Footer);

export default FooterContainer