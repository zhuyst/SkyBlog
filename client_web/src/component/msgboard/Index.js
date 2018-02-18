import React from 'react'
import {Alert, Col, Row} from "react-bootstrap";

import MsgList from "./MsgList";
import MsgSender from './MsgSender'

import '../../static/css/msgboard/msgboard.css'
import {connect} from "react-redux";

class Index extends React.Component{
    render(){
        const login = this.props.login;

        let sender;
        if(login.ok){
            sender = (
                <MsgSender/>
            )
        }
        else {
            sender = (
                <div className="pager">
                    <Alert bsStyle="info">
                        <span className="more_left">
                            <i className="fa fa-warning fa-lg"/>
                        </span>
                        需要登录后才能进行留言
                        <span className="more_right">
                            <i className="fa fa-warning fa-lg"/>
                        </span>
                    </Alert>
                </div>
            )
        }

        return (
            <Row className="msg_board_main">
                <Col mdOffset={1} md={6}>
                    <MsgList/>
                </Col>
                <Col md={4}>
                    {sender}
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        login : state.login
    }
};

const IndexContainer = connect(
    mapStateToProps,
    null
)(Index);

export default IndexContainer