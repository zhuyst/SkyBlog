import React from 'react'
import {Image, Panel} from "react-bootstrap";
import { Link } from "react-router-dom";

import loading from '../../static/images/loading.gif'

class Preview extends React.Component{

    render(){
        const id = this.props.id;
        const path = `/article/${id}`;

        const title = (
            <p>文章标题id={id}</p>
        );

        let className = this.props.isFirst ? "preview preview_first" : "preview";

        return (
                <div className={className}>
                    <Panel collapsible defaultExpanded header={title}>
                        <Link to={path}>
                            <div className="preview_image">
                                <Image src={loading} responsive/>
                            </div>
                            <div className="preview_content">
                                <h3 className="preview_title"><Link to={path}>文章标题</Link></h3>
                                <p>
                                    文章内容预览
                                </p>
                            </div>
                        </Link>
                    </Panel>
                </div>
        )
    }
}

export default Preview