import React from 'react'
import {OverlayTrigger, Popover} from "react-bootstrap";

class UserInfoPopover extends React.Component{
    render(){
        const {content,user} = this.props;

        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="用户信息">
                <table>
                    <tr>
                        <td><strong>UID：</strong></td>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <td><strong>用户名：</strong></td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td><strong>昵称：</strong></td>
                        <td>{user.nickname}</td>
                    </tr>
                </table>
            </Popover>
        );

        return (
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus}>
                {content}
            </OverlayTrigger>
        )
    }
}

export default UserInfoPopover