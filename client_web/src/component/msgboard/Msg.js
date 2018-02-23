import React from 'react'
import {connect} from "react-redux";
import {deleteMsg} from "../../action/msgboard/MsgBoardAction";

class Msg extends React.Component{
    render(){
        const {msg, login,
            deleteMsg} = this.props;
        const id = msg.id;
        const user = login.user;

        const className = this.props.isLast ? "comment comment_last" : "comment";

        return (
            <div className={className}>
                <p>
                    <strong>{msg.author.nickname} : </strong>
                    {msg.content}
                </p>
                {
                    login.ok &&
                    <div className="comment_footer">
                        {
                            (user.admin || user.id === msg.author_id) &&
                            <a onClick={() => deleteMsg(id)}>删除</a>
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
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteMsg : id => {
            dispatch(deleteMsg(id))
        }
    }
};

const MsgContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Msg);

export default MsgContainer;