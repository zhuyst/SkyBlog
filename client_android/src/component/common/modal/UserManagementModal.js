import React from 'react'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Button, ButtonGroup, Label, Modal, Pager, Table} from "react-bootstrap";
import {setUserManagementModalShow} from "../../../action/common/ModalAction";
import {connect} from "react-redux";
import {listUsers, updateUserRole, updateUserStatus} from "../../../action/user/UsersAction";
import {FADE_ENTER, USER_PAGE_SIZE, UserRole, UserStatus} from "../../../Constant";

class UserManagementModal extends React.Component{

    componentWillMount(){
        this.props.listUsers(1);
    }

    render(){
        const {admin,page,show, onHide,
            listUsers,promote,demote,
            lock,unlock} = this.props;
        const {total,page_num,pages} = page;

        let users = [];
        page.list.forEach(user => {
            let roleButton;
            if(user.role === UserRole.ADMIN.id){
                roleButton = (
                    <Button bsSize="small" bsStyle="warning"
                            onClick={() => demote(user.id,page_num)}>
                        降低为访客
                    </Button>
                )
            }
            else if(user.role === UserRole.VISITOR.id){
                roleButton = (
                    <Button bsSize="small" bsStyle="success"
                            onClick={() => promote(user.id,page_num)}>
                        提升为管理员
                    </Button>
                )
            }

            let lockButton;
            if(user.status === UserStatus.NORMAL.id){
                lockButton = (
                    <Button bsSize="small" bsStyle="danger"
                            onClick={() => lock(user.id,page_num)}>锁定账户</Button>
                )
            }
            else if(user.status === UserStatus.LOCKED.id){
                lockButton = (
                    <Button bsSize="small" bsStyle="info"
                            onClick={() => unlock(user.id,page_num)}>解除锁定</Button>
                )
            }

            const button = (
                <ButtonGroup>
                    {
                        !user.admin &&
                        lockButton
                    }
                    {
                        admin.role === 1 &&
                        roleButton
                    }
                </ButtonGroup>
            );

            users.push(
                <CSSTransition
                    classNames="fade"
                    exit={false}
                    timeout={{
                        enter: FADE_ENTER
                    }}
                    key={user.id}>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.nickname}</td>
                        <td>{getRole(user.role)}</td>
                        <td>{user.create_date}</td>
                        <td>{button}</td>
                    </tr>
                </CSSTransition>
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
                            <th>注册时间</th>
                            <th>角色</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                            {users}
                        </TransitionGroup>
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
                    <Button bsStyle="primary" onClick={() => listUsers(page_num)}>
                        &nbsp;刷新&nbsp;
                    </Button>
                    <Button onClick={onHide}>&nbsp;关闭&nbsp;</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const getRole = role => {
    switch (role) {
        case UserRole.SYS_ADMIN.id:
            return UserRole.SYS_ADMIN.name;
        case UserRole.ADMIN.id:
            return UserRole.ADMIN.name;
        case UserRole.VISITOR.id:
            return UserRole.VISITOR.name;
        default:
            return UserRole.VISITOR.name;
    }
};

const mapStateToProps = state => {
    return {
        show : state.navigation.modal.userManagementModal_show,
        page : state.users,
        admin : state.login.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHide: () => {
            dispatch(setUserManagementModalShow(false))
        },
        listUsers : pageNum => {
            dispatch(listUsers(pageNum,USER_PAGE_SIZE));
        },
        promote : (id,pageNum) => {
            dispatch(updateUserRole(id,UserRole.ADMIN.id,pageNum));
        },
        demote : (id,pageNum) => {
            dispatch(updateUserRole(id,UserRole.VISITOR.id,pageNum))
        },
        lock : (id,pageNum) => {
            dispatch(updateUserStatus(id,UserStatus.LOCKED.id,pageNum))
        },
        unlock : (id,pageNum) => {
            dispatch(updateUserStatus(id,UserStatus.NORMAL.id,pageNum))
        }
    }
};

const UserManagementModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagementModal);

export default UserManagementModalContainer