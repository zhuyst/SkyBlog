import React from 'react'
import {connect} from "react-redux";
import ReactMde, { ReactMdeCommands } from 'react-mde';
import {ControlLabel, FormGroup} from "react-bootstrap";
import {change, Field, reduxForm} from "redux-form";

import {FORM_ABOUT} from "../../Constant";
import {setAbout} from "../../action/about/AboutAction";

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

    render(){
        return (
            <form>
                <Field name="content" component={editor}/>
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
        }
    }
};

const AboutEditorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutEditorForm);

export default AboutEditorContainer