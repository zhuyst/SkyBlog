import React from 'react'
import {Row, Col, Grid} from 'react-bootstrap'

import Articles from './index/Articles'
import Navigation from './index/Navigation'
import ClassifyArticles from "./index/classify/ClassifyArticles";
import {Route} from "react-router-dom";

class RouteIndex extends React.Component{
    render(){
        const path = this.props.match.path;

        return (
            <Grid fluid={true}>
                <Row>
                    <Col className="articles_left" mdOffset={1} md={7}>
                        <Route exact strict path={path} component={Articles}/>
                        <Route exact strict path={`${path}/classify/:id`} component={ClassifyArticles}/>
                    </Col>
                    <Col md={3}>
                        <Navigation/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default RouteIndex