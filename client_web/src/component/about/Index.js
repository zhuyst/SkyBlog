import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Col, Panel, Row} from "react-bootstrap";
import {change} from "redux-form";
import {connect} from "react-redux";

import {FORM_ABOUT} from "../../Constant";
import AboutEditor from "./AboutEditor";

import '../../static/css/about/about.css'

class Index extends React.Component{

    render(){
        const {content} = this.props.about;

        return (
            <div className="about_content">
                <Row>
                    <Col md={8} mdOffset={2} sm={12}>
                        <AboutEditor/>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2} sm={12}>
                        <Panel>
                            <Panel.Body>
                                <ReactMarkdown source={content.text}/>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        about : state.about
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

const IndexContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default IndexContainer