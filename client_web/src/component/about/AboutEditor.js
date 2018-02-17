import React from 'react'
import {connect} from "react-redux";
import ReactMde, { ReactMdeCommands } from 'react-mde';
import {Button, ButtonGroup, Col, ControlLabel, FormGroup, Row} from "react-bootstrap";
import {change, Field, reduxForm} from "redux-form";
import {push} from 'react-router-redux'

import {FORM_ABOUT} from "../../Constant";
import {setAbout, updateAbout} from "../../action/about/AboutAction";

class AboutEditor extends React.Component{

    componentWillMount(){
        this.init();
    }

    componentDidUpdate(){
        this.init();
    }

    init = () => {
        const {about,setAboutForm} = this.props;
        setAboutForm(about);
    };

    submit = (data,back) => {
        const about = {
            ...data,
            content : data.content.text
        };
        this.props.updateAbout(about,back);
    };

    render(){
        const {submitting,handleSubmit,
            goBack} = this.props;

        return (
            <form>
                <Field name="content" component={editor}/>
                <Row className="about_button">
                    <Col>
                        <ButtonGroup>
                            <Button disabled={submitting} bsStyle="success"
                                    onClick={handleSubmit(data => this.submit(data,false))}>
                                保存
                            </Button>
                            <Button disabled={submitting} bsStyle="success"
                                    onClick={handleSubmit(data => this.submit(data,true))}>
                                保存并退出编辑
                            </Button>
                            <Button disabled={submitting} bsStyle="primary"
                                    onClick={goBack}>
                                放弃编辑并返回
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </form>
        )
    }
}

const editor = ({ input: { value, onChange }}) => {
    return (
        <FormGroup>
            <ControlLabel>内容</ControlLabel>
            <ReactMde value={value}
                      onChange={onChange}
                      commands={ReactMdeCommands.getDefaultCommands()}/>
        </FormGroup>
    )
};

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
        goBack : () => {
            dispatch(push("/about"));
        },
        updateAbout : (about,back) => {
            dispatch(updateAbout(about,back))
        }
    }
};

const AboutEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutEditorForm);

export default AboutEditorContainer