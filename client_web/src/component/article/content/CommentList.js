import React from 'react'
import {Alert, Badge, Pager, Panel} from 'react-bootstrap'

import Comment from './Comment'
import {connect} from "react-redux";
import {listComments} from "../../../action/article/CommentAction";

class CommentList extends React.Component{

    render(){
        const {listComments,comments,article} = this.props;

        const id = article.id;
        const {list,page_num,pages,total} = comments;

        let commentList = [];
        list.forEach((comment,i) => {
            if(i === list.length - 1){
                commentList.push(
                    <Comment key={comment.id} comment={comment} isLast={true}/>
                )
            }
            else {
                commentList.push(
                    <Comment key={comment.id} comment={comment}/>
                )
            }
        });

        let pager;
        if(page_num === pages){
            pager = (
                <Alert bsStyle="info">
                    &nbsp;&nbsp;已经没有更多评论啦！&nbsp;&nbsp;
                </Alert>
            )
        }
        else {
            pager = (
                <div className="more">
                    <div onClick={() => listComments(id,page_num + 1,10)}>
                        <Alert bsStyle="warning" style={{
                            marginBottom : 0
                        }}>
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
            )
        }

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <span>评论列表&nbsp;&nbsp;<Badge>{total}</Badge></span>
                </Panel.Heading>
                <Panel.Body>
                    {commentList}
                    <div className="pager">
                        {pager}
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.article.article,
        comments : state.article.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listComments : (id,pageNum) => {
            dispatch(listComments(id,pageNum,10))
        }
    }
};

const CommentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);

export default CommentListContainer