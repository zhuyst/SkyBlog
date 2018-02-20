import React from 'react'
import { connect } from 'react-redux'
import {Badge, Button, Col, ListGroup,
    ListGroupItem, Well} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import ClassifyListGroup from "./classify/ClassifyListGroup";

class Navigation extends React.Component{
    render(){
        const {admin,total,classifyList} = this.props;

        let list = [];
        classifyList.forEach(classify => {
            list.push(
                <ClassifyListGroup key={classify.id} classify={classify}/>
            )
        });

        return(
            <Well>
                <div className="navigation_title">
                    <Col mdOffset={4}>
                        <h2>博客分类</h2>
                    </Col>
                </div>

                {
                    admin &&
                    <LinkContainer to="/article/content/new/edit">
                        <Button bsStyle="success" bsSize="large" block
                                className="navigation_button">发布文章</Button>
                    </LinkContainer>
                }

                <ListGroup>
                    <LinkContainer to="/article">
                        <ListGroupItem active>
                            所有文章
                            <Badge>{total}</Badge>
                        </ListGroupItem>
                    </LinkContainer>
                </ListGroup>

                {list}
            </Well>
        )
    }
}

const mapStateToProps = state => {
    return {
        total : state.articles.total,
        classifyList : state.classify.list,
        admin : state.login.user.admin
    }
};

const NavigationContainer = connect(
    mapStateToProps,
    null
)(Navigation);

export default NavigationContainer