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
                                        block
                                        style={{
                                            height : '60px'
                                        }}>
                                    提交</Button>
                            </Col>
                            <Col sm={12} lgHidden mdHidden>
                                <Button bsStyle="primary" block style={{
                                    marginTop: 10
                                }}>提交</Button>
                            </Col>
                        </Row>
                    </FormGroup>
            </div>
        )
    }
}

export default CommentSender