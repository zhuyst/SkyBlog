import React from 'react'
import {TransitionGroup} from "react-transition-group";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Alert, Button, PanelGroup} from "react-bootstrap";
import {withRouter} from "react-router-dom";

import {listArticlesByClassify} from "../../../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE} from "../../../../Constant";

import Preview from "../Preview";
import Pager from "../Pager";
import FadeTransition from "../../../common/FadeTransition";
import ArticlesLoading from "../ArticlesLoading";

class ClassifyArticles extends React.Component{

    componentWillMount(){
        const {listArticlesByClassify} = this.props;
        const id = this.props.match.params.id;
        listArticlesByClassify(id,1);
    }

    render(){
        const {classify, listArticlesByClassify,goArticles} = this.props;
        const {loading, page} = classify;
        const {list,page_num} = page;

        if(page.total === 0 && loading){
            return (
                <ArticlesLoading/>
            )
        }

        return(
            <div>
                <PanelGroup id="articles">
                    <Alert bsStyle="info">
                        <div>
                            您正在查看文章分类&nbsp;-&nbsp;
                            <strong>{classify.name}</strong>
                            &nbsp;下的文章。
                        </div>
                        <div className="show_all_button">
                            <Button onClick={goArticles}>
                                查看全部文章
                            </Button>
                        </div>
                    </Alert>
                    <TransitionGroup>
                        {
                            list.map(article => (
                                <FadeTransition key={article.id}>
                                    <Preview article={article}/>
                                </FadeTransition>
                            ))
                        }
                    </TransitionGroup>
                </PanelGroup>
                <div className="pager">
                    <Pager page={page} loading={loading}
                           onClick={() => listArticlesByClassify(classify.id,page_num + 1)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        classify : state.articles.classify
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listArticlesByClassify : (classifyId,pageNum) => {
            dispatch(listArticlesByClassify(classifyId,pageNum,ARTICLE_PAGE_SIZE))
        },
        goArticles : () => {
            dispatch(push("/article"))
        }
    }
};

const ClassifyArticlesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ClassifyArticles);

export default withRouter(ClassifyArticlesContainer)