import React from 'react'
import {Panel} from "react-bootstrap";
import { Link } from "react-router-dom";

class Preview extends React.Component{

    render(){
        const article = this.props.article;
        const id = article.id;

        const path = `/article/content/${id}`;

        let className = this.props.isFirst ? "preview preview_first" : "preview";

        return (
                <div className={className}>
                    <Panel defaultExpanded>
                        <Panel.Heading>
                            <Panel.Title toggle>
                                {article.title}
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                <Link to={path}>
                                    <div className="preview_content">
                                        <h3 className="preview_title">{article.title}</h3>
                                        <p className="preview_sub_title">{article.sub_title}</p>
                                        <p className="preview_preview">{article.content}</p>
                                        <p className="preview_date">发布时间 : {article.create_date}</p>
                                    </div>
                                </Link>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </div>
        )
    }
}

export default Preview