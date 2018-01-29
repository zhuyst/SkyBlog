import React from 'react'
import {FormControl,ControlLabel,FormGroup,Row,Col,Button} from 'react-bootstrap'

class CommentSender extends React.Component{
    render(){
        return (
            <div className="comment_send">
                    <FormGroup controlId="comment">
                        <ControlLabel>发表评论</ControlLabel>
                        <Row>
                            <Col md={10} sm={12}>
                                <FormControl componentClass="textarea" placeholder="请输入评论......"
                                             style={{
                                                 height : '60px'
                                             }}
                                />
                            </Col>
                            <Col md={2} smHidden xsHidden>
                                <Button bsStyle="primary"
                                        style={{
                                            height : '60px'
                                        }}>
                                    提交</Button>
                            </Col>
                            <Col lgHidden mdHidden className="comment_button">
                                <Button bsStyle="primary" block>  提交  </Button>
                            </Col>
                        </Row>
                    </FormGroup>
            </div>
        )
    }
}

export default CommentSender