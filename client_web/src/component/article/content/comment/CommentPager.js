import React from 'react'
import {Alert} from "react-bootstrap";

class CommentPager extends React.Component{
    render(){
        const {onClick,page,loading} = this.props;
        const {page_num,pages,total} = page;

        if(loading){
            return (
                <div className="pager">
                    <Alert bsStyle="warning">
                        <p>
                            <span className="more_left">
                                <i className="fa fa-lg fa-spinner fa-spin"/>
                            </span>

                            <i className="fa fa-lg fa-spinner fa-spin" />
                            &nbsp;&nbsp;加载中...&nbsp;&nbsp;
                            <i className="fa fa-lg fa-spinner fa-spin" />

                            <span className="more_right">
                                <i className="fa fa-lg fa-spinner fa-spin"/>
                            </span>
                        </p>
                    </Alert>
                </div>
            );
        }
        else if(total === 0){
            return (
                <div className="pager" style={{
                    marginTop : 0
                }}>
                    <Alert bsStyle="info" className="comment_pager">
                        &nbsp;&nbsp;这篇文章还没人评论，快在下方评论吧！&nbsp;&nbsp;
                    </Alert>
                </div>
            )
        }
        else if(page_num === pages){
            return (
                <div className="pager">
                    <Alert bsStyle="info" className="comment_pager">
                        &nbsp;&nbsp;已经没有更多评论啦！&nbsp;&nbsp;
                    </Alert>
                </div>
            )
        }
        else {
            return (
                <div className="pager">
                    <div className="more">
                        <div onClick={onClick}>
                            <Alert bsStyle="warning" className="comment_pager">
                                <p>
                            <span className="more_left">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>

                                    <i className="fa fa-toggle-down" />
                                    &nbsp;&nbsp;点击查看更多评论&nbsp;&nbsp;
                                    <i className="fa fa-toggle-down" />

                                    <span className="more_right">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>
                                </p>
                            </Alert>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default CommentPager