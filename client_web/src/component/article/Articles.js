import React from 'react'
import {PanelGroup} from 'react-bootstrap'
import { connect } from 'react-redux'

import Preview from './Preview'
import {listArticles} from "../../action/ArticlesAction";

class Articles extends React.Component{

    componentDidMount(){
        this.props.listArticles(1);
    }

    render(){
        return(
            <div>
                <PanelGroup id="articles">
                    <Preview id={1} isFirst={true}/>
                    <Preview id={2}/>
                    <Preview id={3}/>
                </PanelGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles : state.articles.articles
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listArticles : pageNum => {
            dispatch(listArticles(pageNum,5))
        }
    }
};

const ArticlesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Articles);

export default ArticlesContainer