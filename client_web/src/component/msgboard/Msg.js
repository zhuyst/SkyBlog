import React from 'react';
import { connect } from 'react-redux';
import { change, untouch } from 'redux-form';
import { Alert } from 'react-bootstrap';
import { deleteMsg, setPreviousMsg } from '../../action/msgboard/MsgBoardAction';
import { FORM_MSG } from '../../Constant';
import { convertBr, confirm } from '../Util';
import UserInfoPopover from '../common/userinfo/UserInfoPopover';

class Msg extends React.Component {
  render() {
    const { msg, login, reply,
      deleteMsg } = this.props;
    const id = msg.id;
    const { user, management } = login;

    const previous_comment = msg.previous_comment;
    const content = {
      __html: convertBr(msg.content),
    };

    return (
      <div className="comment">
        <div className="comment_content">
          <UserInfoPopover user={msg.author}
            content={(
              <strong>
                {msg.author.nickname}
&nbsp;:&nbsp;
              </strong>
)}
          />
          {
                        previous_comment
                        && (
                        <span>
                            回复&nbsp;
                          <i className="fa fa-hand-o-down" />
                        </span>
                        )
                    }
          {
                        previous_comment
                        && (
                        <Alert bsStyle="info" className="previous_comment">
                          <UserInfoPopover user={previous_comment.author}
                            content={(
                              <strong>
                                {previous_comment.author.nickname}
&nbsp;:&nbsp;
                              </strong>
)}
                          />
                          <span dangerouslySetInnerHTML={{
                            __html: convertBr(previous_comment.content),
                          }}
                          />
                        </Alert>
                        )
                    }
          <span dangerouslySetInnerHTML={content} />
        </div>
        {
                    login.ok
                    && (
                    <div className="comment_footer">
                      {
                            (management || user.id === msg.author_id)
                            && <a onClick={() => deleteMsg(id)}>删除</a>
                        }
                      <a onClick={() => reply(msg)}>回复</a>
                    </div>
                    )
                }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMsg: (id) => {
      confirm('确定要删除这条留言吗？').then(() => {
        dispatch(deleteMsg(id));
      });
    },
    reply: (msg) => {
      dispatch(untouch(FORM_MSG, 'content'));
      dispatch(change(FORM_MSG, 'previous_comment_id', msg.id));
      dispatch(setPreviousMsg(msg));
    },
  };
};

const MsgContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Msg);

export default MsgContainer;
