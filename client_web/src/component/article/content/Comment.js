import React from 'react'

class Comment extends React.Component{
    render(){
        const comment = this.props.comment;

        const className = this.props.isLast ? "comment comment_last" : "comment";

        return (
            <div className={className}>
                <p>
                    <strong>{comment.author.nickname} : </strong>
                    {comment.content}
                </p>
                <div className="comment_footer">
                    <a>删除</a>
                    <a>回复</a>
                </div>
            </div>
        )
    }
}

export default Comment