import React from 'react'
import {connect} from "react-redux";
import {deleteComment} from "../../../action/article/ContentAction";

class Comment extends React.Component{
    render(){
        const {comment, pageNum,articleId,
            deleteComment} = this.props;
        const id = comment.id;

        const className = this.props.isLast ? "comment comment_last" : "comment";

        return (
            <div className={className}>
                <p>
                    <strong>{comment.author.nickname} : </strong>
                    {comment.content}
                </p>
                <div className="comment_footer">
                    {
                        this.props.admin &&
                        <a onClick={() => deleteComment(id,articleId,pageNum)}>删除</a>
                    }
                    <a>回复</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articleId : state.article.id,
        pageNum : state.article.comments.page_num,
        admin : state.login.user.admin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteComment : (id,articleId,pageNum) => {
            dispatch(deleteComment(id,articleId,pageNum))
        }
    }
};

const CommentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);

export default CommentContainer;