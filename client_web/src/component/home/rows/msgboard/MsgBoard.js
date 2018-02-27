import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {Link} from "react-router-dom";
import {Badge, Panel} from 'react-bootstrap'
import {connect} from "react-redux";

import {getLength} from "../Util";
import Msg from "./Msg";
import FadeTransition from "../../../common/FadeTransition";

class MsgBoard extends React.Component{
    render(){
        const page = this.props.page;
        const {list,total} = page;

        const MAX_LENGTH = 5;
        const length = getLength(list,MAX_LENGTH);

        const msgList = [];
        for(let i = 0;i < length;i++){
            const msg = list[i];
            msgList.push(
                <FadeTransition key={msg.id}>
                    <Msg msg={msg}/>
                </FadeTransition>
            )
        }

        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        留言板&nbsp;&nbsp;<Badge>{total}</Badge>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <TransitionGroup>
                        {msgList}
                    </TransitionGroup>
                    <Link className="more_link"
                          to="/msg_board">
                        查看更多留言
                    </Link>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.msg.page
    }
};

const MsgBoardContainer = connect(
    mapStateToProps,
    null
)(MsgBoard);

export default MsgBoardContainer