import React from 'react'
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Button, Col} from "react-bootstrap";

import FieldGroup from "../../../common/FieldGroup";
import {FORM_CLASSIFY} from "../../../../Constant";

class NewClassify extends React.Component{

    render(){
        const show = this.props.show;
        const className = show ? "" : "collapse";

        return (
            <div className={className}>
                <Col md={10} sm={12}>
                    <FieldGroup
                        name="name"
                        type="text"
                        label="分类名"
                        placeholder="请输入分类名"
                    />
                </Col>
                <Col md={2} sm={12}>
                    <Button bsStyle="success" block style={{
                        marginTop : '24px',
                        marginBottom : '15px'
                    }}>
                        新增
                    </Button>
                </Col>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};
    const {name} = values;

    if(!name || name.length === 0){
        errors.name = "分类名不能为空"
    }

    return errors;
};

const NewClassifyForm = reduxForm({
    form : FORM_CLASSIFY,
    validate : validate
})(NewClassify);

const mapStateToProps = state => {
    return {
        show : state.classify.show
    }
};

const NewClassifyContainer = connect(
    mapStateToProps,
    null
)(NewClassifyForm);

export default NewClassifyContainer