import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Button, Col, Panel, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {push} from 'react-router-redux'
import {Route} from "react-router-dom";

import {getAbout} from "../../action/about/AboutAction";
import AboutEditor from "./AboutEditor";

import '../../static/css/about/about.css'

class Index extends React.Component{

    componentWillMount(){
        this.props.getAbout();
    }

    render(){
        const {about,admin,pathname,editAbout} = this.props;
        const {content} = about;
        const path = this.props.match.path;

        const editing = pathname === "/about/edit";

        return (
            <div className="about_main">
                {
                    admin &&
                    <Route exact strict path={`${path}/edit`} component={editor}/>
                }
                <Row>
                    <Col md={8} mdOffset={2} sm={12}>
                        <Panel>
                            <Panel.Body>
                                {
                                    admin && !editing &&
                                    <Button bsStyle="primary"
                                            className="about_edit_button"
                                            onClick={editAbout}>
                                        编辑
                                    </Button>
                                }
                                <ReactMarkdown source={content.text}/>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
}

const editor = () => {
    return (
        <Row>
            <Col md={8} mdOffset={2} sm={12}>
                <AboutEditor/>
            </Col>
        </Row>
    )
};

const mapStateToProps = state => {
    return {
        about : state.about,
        admin : state.login.user.admin,
        pathname : state.router.location.pathname
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAbout : () => {
            dispatch(getAbout())
        },
        editAbout : () => {
            dispatch(push("/about/edit"))
        }
    }
};

const IndexContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default IndexContainer