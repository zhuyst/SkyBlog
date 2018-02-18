import React from 'react'
import { Link,withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav,NavItem,Navbar,NavDropdown,MenuItem,
    FormGroup,FormControl,
    Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import {setLoginModelShow, setRegisterModelShow, setUserInfoModelShow} from "../../action/common/ModelAction";
import {logout} from "../../action/common/LoginAction"

import LoginModel from './LoginModel'
import RegisterModel from './RegisterModel'
import UserInfoModel from "./UserInfoModel";

class Navigation extends React.Component{

    render(){
        const { logout,model,initArticle,
            setLoginModelShow,setRegisterModelShow,setUserInfoModelShow,
            login } = this.props;
        const {loginModel_show,registerModel_show,userInfoModel_show} = model;
        const user = login.user;

        let right;
        if(login.ok){
            right = (
                <Nav pullRight>
                    <NavDropdown title={user.nickname} id={user.id}>
                        <MenuItem onClick={() => setUserInfoModelShow(true)}>修改个人信息</MenuItem>
                        <UserInfoModel show={userInfoModel_show} onHide={() => setUserInfoModelShow(false)}/>

                        <MenuItem onClick={logout}>登出</MenuItem>
                    </NavDropdown>
                </Nav>
            )
        }
        else {
            right = (
                <Nav pullRight>
                    <NavItem onClick={() => setLoginModelShow(true)}>登陆</NavItem>
                    <LoginModel show={loginModel_show} onHide={() => setLoginModelShow(false)}/>

                    <NavItem onClick={() => setRegisterModelShow(true)}>注册</NavItem>
                    <RegisterModel show={registerModel_show} onHide={() => setRegisterModelShow(false)}/>
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
        model : state.navigation.model,
        login : state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoginModelShow : loginModel_show => {
            dispatch(setLoginModelShow(loginModel_show))
        },
        setRegisterModelShow : registerModel_show => {
            dispatch(setRegisterModelShow(registerModel_show))
        },
        setUserInfoModelShow : userInfoModel_show => {
            dispatch(setUserInfoModelShow(userInfoModel_show))
        },
        logout : () => {
            dispatch(logout())
        }
    }
};

const NavigationContainer = connect(mapStateToProps,mapDispatchToProps)(Navigation);

export default withRouter(NavigationContainer)