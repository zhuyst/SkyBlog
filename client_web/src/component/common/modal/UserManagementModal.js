import React from 'react'
import {Button, Label, Modal, Pager, Table} from "react-bootstrap";
import {setUserManagementModalShow} from "../../../action/common/ModalAction";
import {connect} from "react-redux";
import {listUsers} from "../../../action/user/UsersAction";
import {USER_PAGE_SIZE} from "../../../Constant";

class UserManagementModal extends React.Component{

    componentWillMount(){
        this.props.listUsers(1);
    }

    render(){
        const {page,show,onHide,listUsers} = this.props;
        const {total,page_num,pages} = page;

        let users = [];
        page.list.forEach(user => {
            users.push(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.nickname}</td>
                    <td>{getRole(user.role)}</td>
                </tr>
            )
        });

        const previousShow = (page_num !== 1);
        const nextShow = (page_num !== pages);

        return (
            <Modal show={show} onHide={onHide} bsSize="large"
                   aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        用户管理&nbsp;<Label bsStyle="primary">&nbsp;{total}&nbsp;</Label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>UID</th>
                            <th>用户名</th>
                            <th>昵称</th>
                            <th>角色</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users}
                        </tbody>
                    </Table>
                    <div className="pager_message">
                        当前为第{page_num}页，共有{pages}页
                    </div>
                    <Pager>
                        {
                            previousShow &&
                            <Pager.Item previous
                                        onClick={() => listUsers(page_num - 1)}>
                                &larr; 上一页
                            </Pager.Item>
                        }
                        {
                            nextShow &&
                            <Pager.Item next
                                        onClick={() => listUsers(page_num + 1)}>
                                下一页 &rarr;
                            </Pager.Item>
                        }
                    </Pager>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>&nbsp;关闭&nbsp;</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const getRole = role => {
    switch (role) {
        case 1:
            return "系统管理员";
        case 2:
            return "管理员";
        case 3:
            return "访客";
        default:
            return "访客";
    }
};

const mapStateToProps = state => {
    return {
        show : state.navigation.modal.userManagementModal_show,
        page : state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHide: () => {
            dispatch(setUserManagementModalShow(false))
        },
        listUsers : pageNum => {
            dispatch(listUsers(pageNum,USER_PAGE_SIZE));
        }
    }
};

const UserManagementModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagementModal);

export default UserManagementModalContainer