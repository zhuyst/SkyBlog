import React from 'react'
import { Route } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

import Articles from './Articles'
import Navigation from './Navigation'
import Content from './content/Content'

import '../../static/css/article/article.css'

class Index extends React.Component{
    componentWillMount(){
        document.title = "博客文章 - 青云的小窝"
    }

    render(){
        const path = this.props.match.path;

        return(
            <div className="articles_main">
                <Route exact strict path={path} component={index}/>
                <Route path={path + "/:id"} component={Content}/>
            </div>
        )
    }
}

const index = () => (
    <Row>
        <Col className="articles_left" mdOffset={1} md={7}>
            <Articles/>
        </Col>
        <Col md={3}>
            <Navigation/>
        </Col>
    </Row>
);

export default Index