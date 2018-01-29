import React from 'react'
import {Col, Pagination, PanelGroup, Row} from 'react-bootstrap'
import { connect } from 'react-redux'

import {changePage} from "../../action/article/ArticlesAction";

import Preview from './Preview'

class Articles extends React.Component{
    render(){
        const {articles_pageNum,
            article_changePage} = this.props;

        return(
            <div>
                <PanelGroup>
                    <Preview id={1} isFirst={true}/>
                    <Preview id={2}/>
                    <Preview id={3}/>
                </PanelGroup>
                <Row>
                    <Col mdOffset={2}>
                        <Pagination
                            bsSize="large"
                            prev next
                            first last
                            ellipsis boundaryLinks
                            items={20} maxButtons={5}
                            activePage={articles_pageNum}
                            onSelect={article_changePage}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles_pageNum : state.articles.articles_pageNum
    }
};

const mapDispatchToProps = dispatch => {
    return {
        article_changePage : pageNum =>{
            dispatch(changePage(pageNum))
        }
    }
};

const ArticlesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Articles);

export default ArticlesContainer