import React from 'react'
import {Alert} from "react-bootstrap";

class Pager extends React.Component{
    render(){
        const {page,onClick} = this.props;
        const {total,page_num,pages} = page;

        if(total === 0){
            return (
                <Alert bsStyle="info">
                    &nbsp;&nbsp;还没有文章，快来发布一个吧&nbsp;&nbsp;
                </Alert>
            )
        }
        if(page_num === pages){
            return (
                <Alert bsStyle="info">
                    &nbsp;&nbsp;已经没有更多文章啦！&nbsp;&nbsp;
                </Alert>
            )
        }
        else {
            return (
                <div className="more">
                    <div onClick={onClick}>
                        <Alert bsStyle="warning">
                            <p>
                            <span className="more_left">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>

                                <i className="fa fa-toggle-down" />
                                &nbsp;&nbsp;点击查看更多文章&nbsp;&nbsp;
                                <i className="fa fa-toggle-down" />

                                <span className="more_right">
                                <i className="fa fa-angle-double-down fa-lg"/>
                            </span>
                            </p>
                        </Alert>
                    </div>
                </div>
            )
        }
    }
}

export default Pager