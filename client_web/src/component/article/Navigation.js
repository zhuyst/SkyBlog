import React from 'react'
import { connect } from 'react-redux'
import {Badge, Button, Col, ListGroup,
    ListGroupItem, Well} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

class Navigation extends React.Component{
    render(){
        return(
            <Well>
                <div className="navigation_title">
                    <Col mdOffset={4}>
                        <h2>博客分类</h2>
                    </Col>
                </div>

                <LinkContainer to="/article/new">
                    <Button bsStyle="success" bsSize="large" block
                            className="navigation_button">  新增文章  </Button>
                </LinkContainer>

                <ListGroup>
                    <ListGroupItem href="#" active>所有文章<Badge>{this.props.total}</Badge></ListGroupItem>
                </ListGroup>

                <ListGroup>
                    <ListGroupItem href="#" active>分类1<Badge>42</Badge></ListGroupItem>
                    <ListGroupItem href="#">分类1 文章1</ListGroupItem>
                    <ListGroupItem href="#">分类1 文章2</ListGroupItem>
                </ListGroup>

                <ListGroup>
                    <ListGroupItem href="#" active>分类2<Badge>42</Badge></ListGroupItem>
                    <ListGroupItem href="#">分类2 文章1</ListGroupItem>
                    <ListGroupItem href="#">分类2 文章2</ListGroupItem>
                </ListGroup>

                <ListGroup>
                    <ListGroupItem href="#" active>分类3<Badge>42</Badge></ListGroupItem>
                    <ListGroupItem href="#">分类3 文章1</ListGroupItem>
                    <ListGroupItem href="#">分类3 文章2</ListGroupItem>
                </ListGroup>
            </Well>
        )
    }
}

const mapStateToProps = state => {
    return {
        total : state.articles.total
    }
};

const NavigationContainer = connect(
    mapStateToProps,
    null
)(Navigation);

export default NavigationContainer