import React from 'react'
import {TransitionGroup} from "react-transition-group";
import { connect } from 'react-redux'
import {
    Alert, Badge, Button, Col, ListGroup,
    ListGroupItem, Well
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import ClassifyListGroup from "./classify/ClassifyListGroup";
import FadeTransition from "../../common/FadeTransition";
import {listClassify} from "../../../action/article/ClassifyAction";
import Loading from "../../common/Loading";

class Navigation extends React.Component{

    componentWillMount(){
        const {classify,listClassify} = this.props;
        if(classify.list.length === 0){
            listClassify();
        }
    }

    render(){
        const {management,total,classify} = this.props;
        const {list,loading} = classify;

        let content = loading ?
            (
                <Alert bsStyle="warning">
                    <Loading/>
                </Alert>
            ) : (
                <TransitionGroup>
                    {
                        list.map(classify => (
                            <FadeTransition key={classify.id}>
                                <ClassifyListGroup classify={classify}/>
                            </FadeTransition>))
                    }
                </TransitionGroup>
            );

        return(
            <Well>
                <div className="navigation_title">
                    <Col mdOffset={4}>
                        <h2>博客分类</h2>
                    </Col>
                </div>

                {
                    management &&
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

                {content}
            </Well>
        )
    }
}

const mapStateToProps = state => {
    return {
        total : state.articles.total,
        classify : state.classify,
        management : state.login.management
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