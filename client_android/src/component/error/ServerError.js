import React from 'react'
import {Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

class ServerError extends React.Component{
    render(){
        return (
            <div className="error">
                <h1>500 SERVER ERROR</h1>
                <br/>
                <h2>
                    服务器错误或者网络不稳定，请稍后再试
                </h2>
                <br/>
                <h2>
                    <LinkContainer to="/">
                        <Button bsStyle="primary" bsSize="large">返回主页</Button>
                    </LinkContainer>
                </h2>
            </div>
        )
    }
}

export default ServerError