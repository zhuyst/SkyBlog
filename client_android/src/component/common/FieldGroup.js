import React from 'react'
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {Field} from "redux-form";

export const MODE_SUCCESS = "MODE_SUCCESS";
export const MODE_NULL = "MODE_NULL";

class FieldGroup extends React.Component{
    render(){
        const {name,label,type,placeholder,error,mode,disabled} = this.props;

        return (
            <Field name={name} component={input}
            label={label} type={type} placeholder={placeholder}
            serverError={error} mode={mode} disabled={disabled}/>
        )
    }
}

class input extends React.Component{
    render(){
        const {input, name, label, type, placeholder, disabled,
            serverError, mode, meta : { visited,touched,error }} = this.props;
        const show = touched || visited;

        let state;
        if(show && (error || serverError === false)){
            state = "error";
        }
        else if(mode === MODE_NULL || input.value.length === 0){
            state = null;
        }
        else if(mode === MODE_SUCCESS){
            state = "success";
        }

        return (
            <FormGroup controlId={name} className="content_title" validationState={state}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl type={type} placeholder={placeholder} disabled={disabled}
                             {...input}/>
                <FormControl.Feedback/>
                {show && error && <HelpBlock>{error}</HelpBlock>}
            </FormGroup>
        )
    }
}

export default FieldGroup