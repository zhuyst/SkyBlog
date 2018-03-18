import React from 'react'
import {Badge,Panel} from 'react-bootstrap'

import Comment from './Comment'
import {connect} from "react-redux";
import {listComments} from "../../../../action/article/ContentAction";
import {COMMENT_PAGE_SIZE} from "../../../../Constant";
import {TransitionGroup} from "react-transition-group";
import FadeTransition from "../../../common/FadeTransition";
import CommentPager from "./CommentPager";
import Loading from "../../../common/Loading";

class CommentList extends React.Component{

    render(){
        const {listComments,comments,comments_loading,article} = this.props;
        const {list,page_num,total} = comments;

        let content;
        if(total === 0 && comments_loading){
            content = <Loading/>
        }
        else {
            content = [
                <TransitionGroup key={1}>
                    {
                        list.map(comment => (
                            <FadeTransition key={comment.id}>
                                <Comment comment={comment}/>
                            </FadeTransition>
                        ))
                    }
                </TransitionGroup>,
                <CommentPager key={2} page={comments} loading={comments_loading}
                              onClick={() => listComments(article.id,page_num + 1)}/>
            ];
        }

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <span>评论列表&nbsp;&nbsp;<Badge>{total}</Badge></span>
                </Panel.Heading>
                <Panel.Body>
                    {content}
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.content.article,
        comments : state.content.comments,
        comments_loading : state.content.comments_loading
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