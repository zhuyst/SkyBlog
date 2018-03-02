import React from 'react'
import {connect} from "react-redux";
import ReactMde, { ReactMdeCommands } from 'react-mde';
import {Button, ButtonGroup, Col, ControlLabel, FormGroup, Glyphicon, Row} from "react-bootstrap";
import {change, Field, reduxForm} from "redux-form";

import {FORM_ABOUT} from "../../Constant";
import {setAbout, updateAbout} from "../../action/about/AboutAction";
import {LinkContainer} from "react-router-bootstrap";
import {setUploadModalShow} from "../../action/article/UploadAction";

class AboutEditor extends React.Component{

    componentWillMount(){
        const {about,setAboutForm} = this.props;
        setAboutForm(about);
    }

    submit = (data,back) => {
        const about = {
            ...data,
            content : data.content.text
        };
        this.props.updateAbout(about,back);
    };

    render(){
        const {submitting,handleSubmit,showUploadModal} = this.props;

        return (
            <form>
                <Field name="content" component={editor} showUploadModal={showUploadModal}/>
                <Row className="about_button">
                    <Col>
                        <ButtonGroup>
                            <Button disabled={submitting} bsStyle="success"
                                    onClick={handleSubmit(data => this.submit(data,false))}>
                                <Glyphicon glyph="floppy-disk" />
                                &nbsp;&nbsp;保存&nbsp;
                            </Button>
                            <Button disabled={submitting} bsStyle="success"
                                    onClick={handleSubmit(data => this.submit(data,true))}>
                                <Glyphicon glyph="floppy-saved" />
                                &nbsp;&nbsp;保存并退出编辑&nbsp;
                            </Button>
                            <LinkContainer to="/about">
                                <Button disabled={submitting} bsStyle="primary">
                                    <Glyphicon glyph="circle-arrow-left" />
                                    &nbsp;&nbsp;放弃编辑并返回&nbsp;
                                </Button>
                            </LinkContainer>
                        </ButtonGroup>
                    </Col>
                </Row>
            </form>
        )
    }
}

class editor extends React.Component{

    render() {
        const {
            input: {value, onChange},
            meta: {submitting},
            showUploadModal
        } = this.props;

        let commands = ReactMdeCommands.getDefaultCommands();

        const uploadCommand = {
            icon: 'upload',
            tooltip:
                '上传文件',
            execute: (text, selection) => {
                showUploadModal();

                return {
                    text: text,
                    selection: selection
                };
            },
        };

        commands.push([uploadCommand]);

        return (
            <FormGroup>
                <ControlLabel>内容</ControlLabel>
                <ReactMde value={value}
                          onChange={onChange}
                          commands={commands}
                          textAreaProps={{disabled : submitting}}
                          visibility={{preview:false}}/>
            </FormGroup>
        )
    }
}

const validate = values => {
    const errors = {};
    const {content} = values;

    if(!content || content.text.length === 0){
        errors.content = "内容不能为空"
    }

    return errors;
};

const onChange = (values,dispatch) => {
    dispatch(setAbout(values))
};

const AboutEditorForm = reduxForm({
    form: FORM_ABOUT,
    validate : validate,
    onChange : onChange
})(AboutEditor);

const mapStateToProps = state => {
    return {
        about : state.about
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAboutForm : about => {
            dispatch(change(FORM_ABOUT,"content",about.content))
        },
        updateAbout : (about,back) => {
            dispatch(updateAbout(about,back))
        },
        showUploadModal : () => {
            dispatch(setUploadModalShow(true))
        }
    }
};

const AboutEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutEditorForm);

export default AboutEditorContainer