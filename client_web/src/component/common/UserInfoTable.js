import React from 'react'

class UserInfoTable extends React.Component{
    render(){
        const user = this.props.user;

        return (
            <table>
                <tbody>
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
                </tbody>
            </table>
        )
    }
}

export default UserInfoTable