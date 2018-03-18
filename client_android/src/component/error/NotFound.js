import React from 'react'
import {Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import '../../static/css/error/error.css'

class NotFound extends React.Component{
    render(){
        return (
            <div className="error">
                <h1>404 NOT FOUND</h1>
                <br/>
                <h2>
                    没有找到该页面，你可以从上方页面查看其它页面
                </h2>
                <br/>
                <h2>
                    或者&nbsp;&nbsp;
                    <LinkContainer to="/">
                        <Button bsStyle="primary" bsSize="large">返回主页</Button>
                    </LinkContainer>
                </h2>
            </div>
        )
    }
}

export default NotFound