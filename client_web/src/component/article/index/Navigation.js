import React from 'react'
import {TransitionGroup} from "react-transition-group";
import { connect } from 'react-redux'
import {Badge, Button, Col, ListGroup,
    ListGroupItem, Well} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import ClassifyListGroup from "./classify/ClassifyListGroup";
import FadeTransition from "../../common/FadeTransition";
import {listClassify} from "../../../action/article/ClassifyAction";

class Navigation extends React.Component{

    componentWillMount(){
        this.props.listClassify();
    }

    render(){
        const {admin,total,classifyList} = this.props;

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

                <TransitionGroup>
                    {
                        classifyList.map(classify => (
                            <FadeTransition key={classify.id}>
                                <ClassifyListGroup classify={classify}/>
                            </FadeTransition>))
                    }
                </TransitionGroup>
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

const mapDispatchToProps = dispatch => {
    return {
        listClassify : () => {
            dispatch(listClassify());
        }
    }
};

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);

export default NavigationContainer