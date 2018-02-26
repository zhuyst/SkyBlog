import React from 'react'
import { Link,withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav,NavItem,Navbar,NavDropdown,MenuItem} from 'react-bootstrap'
import { connect } from 'react-redux'

import {
    setLoginModalShow, setRegisterModalShow, setUserInfoModalShow,
    setUserManagementModalShow
} from "../../action/common/ModalAction";
import {logout, setAdmin} from "../../action/common/LoginAction"

import LoginModal from './modal/LoginModal'
import RegisterModal from './modal/RegisterModal'
import UserInfoModal from "./modal/UserInfoModal";
import UserManagementModal from "./modal/UserManagementModal";

class Navigation extends React.Component{

    render(){
        const { logout, login, setAdmin,showLoginModal,showUserManagementModal,
            showRegisterModal,showUserInfoModal} = this.props;
        const user = login.user;
        const admin = user.admin;

        let right;
        if(login.ok){
            right = (
                <Nav pullRight>
                    <NavDropdown title={user.nickname} id={user.id}>
                        <MenuItem onClick={showUserInfoModal}>修改个人信息</MenuItem>
                        <UserInfoModal/>

                        {
                            admin &&
                            <MenuItem onClick={showUserManagementModal}>用户管理</MenuItem>
                        }
                        {
                            admin &&
                            <UserManagementModal/>
                        }

                        <MenuItem onClick={logout}>登出</MenuItem>
                    </NavDropdown>
                    <NavItem onClick={() => setAdmin(!admin)}>
                        {admin ? "访客模式" : "管理模式"}
                    </NavItem>
                </Nav>
            )
        }
        else {
            right = (
                <Nav pullRight>
                    <NavItem onClick={showLoginModal}>登陆</NavItem>
                    <LoginModal/>

                    <NavItem onClick={showRegisterModal}>注册</NavItem>
                    <RegisterModal/>
                </Nav>
            )
        }

        return (
            <Navbar
                collapseOnSelect
                className="navigation">
                <Navbar.Header>
                    <Navbar.Brand className="nav_brand">
                        <Link to="/">SkyBlog</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav className="nav_button">
                        <LinkContainer to="/home">
                            <NavItem>首页</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/article">
                            <NavItem>博客文章</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/msg_board">
                            <NavItem>留言板</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/about">
                            <NavItem>关于</NavItem>
                        </LinkContainer>
                    </Nav>

                    {/*<Navbar.Form pullRight>*/}
                        {/*<FormGroup>*/}
                            {/*<FormControl type="text" placeholder="搜索文章..." />*/}
                        {/*</FormGroup>*/}
                        {/*<Button type="submit">搜索</Button>*/}
                    {/*</Navbar.Form>*/}

                    {right}
                </Navbar.Collapse>
            </Navbar>
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
        showLoginModal : () => {
            dispatch(setLoginModalShow(true))
        },
        showRegisterModal : () => {
            dispatch(setRegisterModalShow(true))
        },
        showUserInfoModal : () => {
            dispatch(setUserInfoModalShow(true))
        },
        showUserManagementModal : () => {
            dispatch(setUserManagementModalShow(true))
        },
        logout : () => {
            dispatch(logout())
        },
        setAdmin : admin => {
            dispatch(setAdmin(admin))
        }
    }
};

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);

export default withRouter(NavigationContainer)