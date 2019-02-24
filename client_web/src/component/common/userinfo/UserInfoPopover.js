import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import UserInfoTable from './UserInfoTable';

class UserInfoPopover extends React.Component {
  render() {
    const { content, user } = this.props;

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title="用户信息">
        <UserInfoTable user={user} />
      </Popover>
    );

    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="top"
        overlay={popoverHoverFocus}
      >
        {content}
      </OverlayTrigger>
    );
  }
}

export default UserInfoPopover;
