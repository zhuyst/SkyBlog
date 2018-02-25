import React from 'react'
import {Panel} from "react-bootstrap";
import {connect} from "react-redux";
import Commit from "./Commit";
import {SKY_BLOG_URL} from "../../../../Constant";

class Github extends React.Component{
    render(){
        const commits = this.props.commits;

        let list = [];
        commits.forEach(commit => {
            list.push(
                <Commit key={commit.sha} commit={commit}/>
            )
        });

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        SkyBlog项目动态
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {list}
                    <a className="more_link"
                       href={SKY_BLOG_URL} target="_blank">
                        在Github上查看项目
                    </a>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        commits : state.github.commits
    }
};

const GithubContainer = connect(
    mapStateToProps,
    null
)(Github);

export default GithubContainer