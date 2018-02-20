import React from 'react'

class Msg extends React.Component{
    render(){
        const msg = this.props.msg;

        return (
            <div className="comment">
                <p>
                    <strong>{msg.author.nickname} : </strong>
                    {msg.content}
                </p>
            </div>
        )
    }
}

export default Msg