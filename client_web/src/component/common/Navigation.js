import React from 'react'
import { Link,withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav,NavItem,Navbar,NavDropdown,MenuItem,
    FormGroup,FormControl,
    Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import {setLoginModalShow, setRegisterModalShow, setUserInfoModalShow} from "../../action/common/ModalAction";
import {logout} from "../../action/common/LoginAction"

import LoginModal from './modal/LoginModal'
import RegisterModal from './modal/RegisterModal'
import UserInfoModal from "./modal/UserInfoModal";

class Navigation extends React.Component{

    render(){
        const { logout,modal,
            setLoginModalShow,setRegisterModalShow,setUserInfoModalShow,
            login } = this.props;
        const {loginModal_show,registerModal_show,userInfoModal_show} = modal;
        const user = login.user;

        let right;
        if(login.ok){
            right = (
                <Nav pullRight>
                    <NavDropdown title={user.nickname} id={user.id}>
                        <MenuItem onClick={() => setUserInfoModalShow(true)}>修改个人信息</MenuItem>
                        <UserInfoModal/>

                        <MenuItem onClick={logout}>登出</MenuItem>
                    </NavDropdown>
                </Nav>
            )
        }
        else {
            right = (
                <Nav pullRight>
                    <NavItem onClick={() => setLoginModalShow(true)}>登陆</NavItem>
                    <LoginModal/>

                    <NavItem onClick={() => setRegisterModalShow(true)}>注册</NavItem>
                    <RegisterModal/>
                </Nav>
            )
        }

        return (
            <Navbar
                collapseOnSelect
                className="navigation">
                <Navbar.Header>
                    <Navbar.Brand className="navBrand">
                        <Link to="/">SkyBlog</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav className="navButton">
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

                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" placeholder="搜索文章..." />
                        </FormGroup>
                        <Button type="submit">搜索</Button>
                    </Navbar.Form>

                    {right}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        modal : state.navigation.modal,
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoginModalShow : loginModal_show => {
            dispatch(setLoginModalShow(loginModal_show))
        },
        setRegisterModalShow : registerModal_show => {
            dispatch(setRegisterModalShow(registerModal_show))
        },
        setUserInfoModalShow : userInfoModal_show => {
            dispatch(setUserInfoModalShow(userInfoModal_show))
        },
        logout : () => {
            dispatch(logout())
        }
    }
};

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);

export default withRouter(NavigationContainer)