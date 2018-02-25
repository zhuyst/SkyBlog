import React from 'react'
import {connect} from "react-redux";
import {change, untouch} from "redux-form";

import {deleteComment, setPreviousComment} from "../../../../action/article/ContentAction";
import {FORM_COMMENT} from "../../../../Constant";
import {convertBr} from "../../../Util";
import {Alert} from "react-bootstrap";
import UserInfoPopover from "../../../common/UserInfoPopover";

class Comment extends React.Component{
    render(){
        const {comment,login,
            reply,deleteComment} = this.props;
        const id = comment.id;
        const user = login.user;

        const previous_comment = comment.previous_comment;
        const content = {
            __html : convertBr(comment.content)
        };

        return (
            <div className="comment">
                <div className="comment_content">
                    <UserInfoPopover user={comment.author} content={
                        <strong>{comment.author.nickname}&nbsp;:&nbsp;</strong>
                    }/>
                    {
                        previous_comment &&
                        <span>
                            回复&nbsp;<i className="fa fa-hand-o-down"/>
                        </span>
                    }
                    {
                        previous_comment &&
                            <Alert bsStyle="info" className="previous_comment">
                                <UserInfoPopover user={previous_comment.author} content={
                                    <strong>{previous_comment.author.nickname}&nbsp;:&nbsp;</strong>
                                }/>
                                <span dangerouslySetInnerHTML={{
                                    __html : convertBr(previous_comment.content)
                                }}/>
                            </Alert>
                    }
                    <span dangerouslySetInnerHTML={content}/>
                </div>
                {
                    login.ok &&
                    <div className="comment_footer">
                        {
                            (user.admin || user.id === comment.author_id) &&
                            <a onClick={() => deleteComment(id)}>删除</a>
                        }
                        <a onClick={() => reply(comment)}>回复</a>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteComment : id => {
            dispatch(deleteComment(id))
        },
        reply : comment => {
            dispatch(untouch(FORM_COMMENT,"content"));
            dispatch(change(FORM_COMMENT,"previous_comment_id",comment.id));
            dispatch(setPreviousComment(comment));
        }
    }
};

const CommentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);

export default CommentContainer;