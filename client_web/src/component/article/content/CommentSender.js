import React from 'react'
import {connect} from "react-redux";
import {FormControl,ControlLabel,FormGroup,Row,Col,Button,HelpBlock} from 'react-bootstrap'
import {Field, reduxForm} from "redux-form";

import {FORM_COMMENT} from "../../../Constant";
import {insertComment} from "../../../action/article/ContentAction";

class CommentSender extends React.Component{

    submit = data => {
        const {article,comments,
            insertComment} = this.props;

        const comment = {
            article_id : data.article_id,
            previous_comment_id : data.previous_comment_id,
            content : data.content
        };
        insertComment(article.id,comment,comments.page_num)
    };

    render(){
        const {handleSubmit} = this.props;

        return (
            <div className="comment_send">
                <form>
                    <Field name="article_id" component="input" type="hidden"/>
                    <Field name="previous_comment_id" component="input" type="hidden"/>
                    <Row>
                        <Col md={10} sm={12}>
                            <Field name="content" component={textArea}/>
                        </Col>
                        <Col md={2} smHidden xsHidden>
                            <Button bsStyle="primary"
                                    block
                                    style={{
                                        height : '60px',
                                        marginTop : '24px'
                                    }}
                                    onClick={handleSubmit(data => this.submit(data))}>
                                提交</Button>
                        </Col>
                        <Col sm={12} lgHidden mdHidden>
                            <Button bsStyle="primary" block style={{
                                marginTop: '10px'
                            }} onClick={handleSubmit(data => this.submit(data))}>提交</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

const textArea = (field) => {
    const error = field.meta.touched && field.meta.error;

    let state = null;
    if(error){
        state = "error";
    }

    return (
        <FormGroup controlId="comment" validationState={state}>
            <ControlLabel>发表评论</ControlLabel>
            <FormControl componentClass="textarea" placeholder="请输入评论......"
                         style={{
                             height : '60px'
                         }}
                         {...field.input}
            />
            <FormControl.Feedback/>
            {
                error &&
                <HelpBlock>{field.meta.error}</HelpBlock>
            }
        </FormGroup>
    )
};

const validate = values => {
    const errors = {};
    const {content} = values;

    if(!content || content.length === 0){
        errors.content = "评论内容不能为空"
    }

    return errors;
};

const CommentSenderForm = reduxForm({
    form : FORM_COMMENT,
    validate : validate
})(CommentSender);

const mapStateToProps = state => {
    return {
        article : state.article,
        comments : state.article.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        insertComment : (articleId,comment,pageNum) => {
            dispatch(insertComment(articleId,comment,pageNum))
        }
    }
};

const CommentSenderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentSenderForm);

export default CommentSenderContainer