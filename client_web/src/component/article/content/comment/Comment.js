import React from 'react'
import {connect} from "react-redux";
import {deleteComment} from "../../../../action/article/ContentAction";

class Comment extends React.Component{
    render(){
        const {comment, pageNum,articleId,login,
            deleteComment} = this.props;
        const id = comment.id;
        const user = login.user;

        const className = this.props.isLast ? "comment comment_last" : "comment";

        return (
            <div className={className}>
                <p>
                    <strong>{comment.author.nickname} : </strong>
                    {comment.content}
                </p>
                {
                    login.ok &&
                    <div className="comment_footer">
                        {
                            (user.admin || user.id === comment.author_id) &&
                            <a onClick={() => deleteComment(id,articleId,pageNum)}>删除</a>
                        }
                        <a>回复</a>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articleId : state.content.article.id,
        pageNum : state.content.comments.page_num,
        login : state.login
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