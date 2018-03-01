import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {Panel} from "react-bootstrap";
import {connect} from "react-redux";
import Commit from "./Commit";
import {GITHUB_PAGE_SIZE, SKY_BLOG_URL} from "../../../../Constant";
import FadeTransition from "../../../common/FadeTransition";
import {LinkContainer} from "react-router-bootstrap";
import {listCommits} from "../../../../action/github/GithubAction";

class Github extends React.Component{

    componentWillMount(){
        this.props.listCommits();
    }

    render(){
        const commits = this.props.commits;

        return (
            <Panel bsStyle="primary">
                <LinkContainer to={SKY_BLOG_URL}>
                    <Panel.Heading className="rows_title">
                        <Panel.Title componentClass="h3">
                            SkyBlog项目动态
                        </Panel.Title>
                    </Panel.Heading>
                </LinkContainer>
                <Panel.Body>
                    <TransitionGroup>
                        {
                            commits.map(commit => (
                                <FadeTransition key={commit.sha}>
                                    <Commit commit={commit}/>
                                </FadeTransition>
                            ))
                        }
                    </TransitionGroup>
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

const mapDispatchToProps = dispatch => {
    return {
        listCommits : () => {
            dispatch(listCommits(GITHUB_PAGE_SIZE))
        }
    }
};

const GithubContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Github);

export default GithubContainer