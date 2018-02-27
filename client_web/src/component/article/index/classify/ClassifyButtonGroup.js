import React from 'react'
import {Button, ButtonGroup, Glyphicon, ListGroupItem} from "react-bootstrap";
import {deleteClassify, updateClassify} from "../../../../action/article/ClassifyAction";
import {connect} from "react-redux";
import FieldGroup from "../../../common/FieldGroup";
import {FORM_CLASSIFY} from "../../../../Constant";
import {change, Field, reduxForm} from "redux-form";

class ClassifyButtonGroup extends React.Component{

    constructor(){
        super();
        this.state = {
            edit : false
        }
    }

    componentWillMount(){
        this.init();
    }

    init = () => {
        const {classify,setClassifyForm} = this.props;
        setClassifyForm(classify);
    };

    setEdit = edit => {
        this.setState({
            edit : edit
        });
    };

    submit = data => {
        this.props.updateClassify(data);
        this.setEdit(false);
    };

    render(){
        const {classify,deleteClassify,handleSubmit} = this.props;

        let buttonGroup;
        if(this.state.edit){
            buttonGroup = (
                <ListGroupItem>
                    <Field name="id" component="input" type="hidden"/>
                    <FieldGroup
                        name="name"
                        type="text"
                        label="分类名"
                        placeholder="请输入分类名"
                    />
                    <ButtonGroup className="btn-block">
                        <Button bsStyle="success"
                                className="navigation_classify_button"
                                onClick={handleSubmit(data => this.submit(data))}>
                            <Glyphicon glyph="ok-sign" />
                            &nbsp;&nbsp;确认&nbsp;
                        </Button>
                        <Button bsStyle="danger"
                                className="navigation_classify_button"
                                onClick={() => this.setEdit(false)}>
                            <Glyphicon glyph="remove-sign" />
                            &nbsp;&nbsp;取消&nbsp;
                        </Button>
                    </ButtonGroup>
                </ListGroupItem>
            )
        }
        else {
            buttonGroup = (
                <ButtonGroup className="btn-block navigation_classify_edit">
                    <Button className="navigation_classify_button"
                            onClick={() => this.setEdit(true)}>
                        <Glyphicon glyph="edit" />
                        &nbsp;&nbsp;编辑分类名&nbsp;
                    </Button>
                    <Button bsStyle="danger"
                            className="navigation_classify_button"
                            onClick={() => deleteClassify(classify.id)}>
                        <Glyphicon glyph="trash" />
                        &nbsp;&nbsp;删除分类&nbsp;
                    </Button>
                </ButtonGroup>
            )
        }

        return (
            <form>
                {buttonGroup}
            </form>
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

const onSubmit = (values,dispatch) => {
    const {name} = values;
    const classify = {
        name : name
    };

    dispatch(updateClassify(classify))
};

const ClassifyButtonGroupForm = reduxForm({
    form : FORM_CLASSIFY,
    onSubmit : onSubmit,
    validate : validate
})(ClassifyButtonGroup);

const mapDispatchToProps = dispatch => {
    return {
        setClassifyForm : classify => {
            dispatch(change(FORM_CLASSIFY,"id",classify.id));
            dispatch(change(FORM_CLASSIFY,"name",classify.name))
        },
        updateClassify : classify => {
            dispatch(updateClassify(classify))
        },
        deleteClassify : id => {
            dispatch(deleteClassify(id))
        }
    }
};

const ClassifyButtonGroupContainer = connect(
    null,
    mapDispatchToProps
)(ClassifyButtonGroupForm);

export default ClassifyButtonGroupContainer