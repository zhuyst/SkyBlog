import React from 'react'
import {FormControl,ControlLabel,FormGroup,Row,Col,Button} from 'react-bootstrap'
import {Field, reduxForm} from "redux-form";
import {FORM_COMMENT} from "../../../Constant";
import {connect} from "react-redux";
import {insertComment} from "../../../action/article/ContentAction";

class CommentSender extends React.Component{
    render(){
        const {article,comments,
            insertComment,handleSubmit} = this.props;

        return (
            <div className="comment_send">
                <form>
                    <Field name="article_id" component="input" type="hidden"/>
                    <Field name="previous_comment_id" component="input" type="hidden"/>
                    <FormGroup controlId="comment">
                        <ControlLabel>发表评论</ControlLabel>
                        <Row>
                            <Col md={10} sm={12}>
                                <Field name="content" component={textArea}/>
                            </Col>
                            <Col md={2} smHidden xsHidden>
                                <Button bsStyle="primary"
                                        block
                                        style={{
                                            height : '60px'
                                        }}>
                                    提交</Button>
                            </Col>
                            <Col sm={12} lgHidden mdHidden>
                                <Button bsStyle="primary" block style={{
                                    marginTop: 10
                                }} onClick={handleSubmit(
                                    data => {
                                        const comment = {
                                            article_id : data.article_id,
                                            previous_comment_id : data.previous_comment_id,
                                            content : data.content
                                        };
                                        insertComment(article.id,comment,comments.page_num)
                                    }
                                )}>提交</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

const textArea = (field) => {
    return (
        <FormControl componentClass="textarea" placeholder="请输入评论......"
                     style={{
                         height : '60px'
                     }}
                     {...field.input}
        />
    )
};

const CommentSenderForm = reduxForm({
    form : FORM_COMMENT,
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