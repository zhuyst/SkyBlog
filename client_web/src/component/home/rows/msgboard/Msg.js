import React from 'react';
import { convertBr } from '../../../Util';
import UserInfoPopover from '../../../common/userinfo/UserInfoPopover';

class Msg extends React.Component {
  render() {
    const msg = this.props.msg;

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
          <span dangerouslySetInnerHTML={{
            __html: convertBr(msg.content),
          }}
          />
        </div>
      </div>
    );
  }
}

export default Msg;
