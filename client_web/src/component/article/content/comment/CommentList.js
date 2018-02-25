import React from 'react'
import {Alert, Badge,Panel} from 'react-bootstrap'

import Comment from './Comment'
import {connect} from "react-redux";
import {listComments} from "../../../../action/article/ContentAction";
import {COMMENT_PAGE_SIZE} from "../../../../Constant";

class CommentList extends React.Component{

    render(){
        const {listComments,comments,article} = this.props;

        const id = article.id;
        const {list,page_num,pages,total} = comments;

        let commentList = [];
        list.forEach(comment => {
            commentList.push(
                <Comment key={comment.id} comment={comment}/>
            )
        });

        let pager;
        if(total === 0){
            pager = (
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
            pager = (
                <div className="pager">
                    <Alert bsStyle="info" className="comment_pager">
                        &nbsp;&nbsp;已经没有更多评论啦！&nbsp;&nbsp;
                    </Alert>
                </div>
            )
        }
        else {
            pager = (
                <div className="pager">
                    <div className="more">
                        <div onClick={() => listComments(id,page_num + 1)}>
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

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <span>评论列表&nbsp;&nbsp;<Badge>{total}</Badge></span>
                </Panel.Heading>
                <Panel.Body>
                    {commentList}
                    {pager}
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.content.article,
        comments : state.content.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listComments : (id,pageNum) => {
            dispatch(listComments(id,pageNum,COMMENT_PAGE_SIZE))
        }
    }
};

const CommentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);

export default CommentListContainer