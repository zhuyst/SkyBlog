import React from 'react'
import {Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

class NotFound extends React.Component{
    render(){
        return (
            <div>
                <h1>404 NOT FOUND</h1>
                <h2>
                    没有找到该页面，你可以从上方页面查看其它页面，或者
                    <br/>
                    <LinkContainer to="/">
                        <Button>返回主页</Button>
                    </LinkContainer>
                </h2>
            </div>
        )
    }
}

export default NotFound