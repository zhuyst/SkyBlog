import React from 'react'

class Msg extends React.Component{
    render(){
        const username = "评论人";
        const comment = "评论";

        const className = this.props.isLast ? "comment comment_last" : "comment";

        return (
            <div className={className}>
                <p>
                    <strong>{username} : </strong>
                    {comment}
                </p>
                <div className="comment_footer">
                    <a>删除</a>
                    <a>回复</a>
                </div>
            </div>
        )
    }
}

export default Msg