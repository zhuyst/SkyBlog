import React from 'react'
import {Button, Glyphicon} from "react-bootstrap";
import {SKY_BLOG_URL} from "../../Constant";
import {connect} from "react-redux";
import {getProjectStar} from "../../action/github/GithubAction";

class Footer extends React.Component{

    componentWillMount(){
        this.props.getProjectStar();
    }

    render(){
        const {count,star} = this.props;
        const url = SKY_BLOG_URL;

        return (
            <div className="footer">
                <p>网页访问次数：{count === null ? "加载中..." : count}</p>
                <p>备案号：<a href="http://www.beian.miit.gov.cn">粤ICP备16113942号</a></p>
                <p>
                    Powered by <a href={url}>SkyBlog</a>
                    &nbsp;
                    <Button bsSize="small" className="star_button"
                            href={url} target="_blank">
                        <Glyphicon glyph="star" />
                        Star&nbsp;&nbsp;{star === null ? "" : star}
                    </Button>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        count : state.access_log.count,
        star : state.github.star
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProjectStar : () => {
            dispatch(getProjectStar());
        }
    }
};

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);

export default FooterContainer