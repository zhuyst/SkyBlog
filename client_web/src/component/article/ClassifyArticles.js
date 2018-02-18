import React from 'react'
import {connect} from "react-redux";
import {Alert, PanelGroup} from "react-bootstrap";

import {listArticlesByClassify} from "../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE} from "../../Constant";

import Preview from "./Preview";
import Pager from "./Pager";

class ClassifyArticles extends React.Component{

    componentWillMount(){
        const id = this.props.match.params.id;
        this.props.listArticlesByClassify(id,1)
    }

    render(){
        const {page, classify,
            listArticlesByClassify} = this.props;
        const {list,page_num} = page;

        const classifyId = this.props.match.params.id;

        const articles = [];
        list.forEach((article,i) => {
            if(i === 0){
                articles.push(
                    <Preview key={article.id} article={article} isFirst={true}/>
                )
            }
            else{
                articles.push (
                    <Preview key={article.id} article={article}/>
                )
            }
        });

        return(
            <div>
                <PanelGroup id="articles">
                    <Alert bsStyle="primary">
                        <h3>
                            您正在查看文章分类&nbsp;-&nbsp;
                            <strong>{classify.name}</strong>
                            &nbsp;下的文章
                        </h3>
                    </Alert>
                    {articles}
                </PanelGroup>
                <div className="pager">
                    <Pager page={page} onClick={() => listArticlesByClassify(classifyId,page_num + 1)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        page : state.articles.page,
        classify : state.articles.classify
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listArticlesByClassify : (classifyId,pageNum) => {
            dispatch(listArticlesByClassify(classifyId,pageNum,ARTICLE_PAGE_SIZE))
        }
    }
};

const ClassifyArticlesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ClassifyArticles);

export default ClassifyArticlesContainer