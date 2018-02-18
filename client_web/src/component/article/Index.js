import React from 'react'
import { Route,withRouter } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

import Articles from './Articles'
import Navigation from './Navigation'
import Content from './content/Content'

import '../../static/css/article/article.css'
import EditContent from "./content/edit/EditContent";
import {connect} from "react-redux";
import ClassifyArticles from "./ClassifyArticles";

class Index extends React.Component{
    componentWillMount(){
        document.title = "博客文章 - 青云的小窝"
    }

    render(){
        const login = this.props.login;
        const path = this.props.match.path;

        return(
            <div className="articles_main">
                <Route exact strict path={path} component={ArticleIndex}/>
                <Route exact strict path={`${path}/classify/:id`} component={ClassifyIndex}/>
                <Route exact strict path={`${path}/content/:id`} component={Content}/>
                {
                    login.ok &&
                    <Route path={`${path}/content/:id/edit`} component={EditContent} />
                }
            </div>
        )
    }
}

const ArticleIndex = () => (
    <RouteIndex readClassify={false}/>
);

const ClassifyIndex = () => (
    <RouteIndex readClassify={true} />
);

const RouteIndex = readClassify => {
    return(
        <Row>
            <Col className="articles_left" mdOffset={1} md={7}>
                {readClassify ? <Articles/> : <ClassifyArticles/>}
            </Col>
            <Col md={3}>
                <Navigation/>
            </Col>
        </Row>
    )
};

const mapStateToProps = state => {
    return {
        login: state.login
    }
};

const IndexContainer = connect(
    mapStateToProps,
    null
)(Index);

export default withRouter(IndexContainer)