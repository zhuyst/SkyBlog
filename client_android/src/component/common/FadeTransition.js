import React from 'react'
import {CSSTransition} from "react-transition-group";
import {FADE_ENTER, FADE_EXIT} from "../../Constant";

class FadeTransition extends React.Component{
    render(){
        return (
            <CSSTransition
                {...this.props}
                classNames="fade"
                timeout={{
                    enter: FADE_ENTER,
                    exit: FADE_EXIT
                }}
            />
        )
    }
}

export default FadeTransition