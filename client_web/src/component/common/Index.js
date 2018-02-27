import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {TransitionGroup} from "react-transition-group";
import { connect } from 'react-redux'

import Navigation from './Navigation'
import Footer from './Footer'

import Home from '../home/Index'
import Article from '../article/Index'
import MsgBoard from '../msgboard/Index'
import About from '../about/Index'
import NotFound from "../error/NotFound";
import FadeTransition from "./FadeTransition";
import ServerError from "../error/ServerError";

import {ARTICLE_PAGE_SIZE, GITHUB_PAGE_SIZE, MSG_PAGE_SIZE} from "../../Constant";

import {listArticles} from "../../action/article/ArticlesAction";
import {listClassify} from "../../action/article/ClassifyAction";
import {getAbout} from "../../action/about/AboutAction";
import {checkUserLoginState} from "../../action/user/UsersAction";

import '../../static/css/common/common.css'
import '../../static/css/common/animation.css'
import {listMsg} from "../../action/msgboard/MsgBoardAction";
import {listCommits} from "../../action/github/GithubAction";
import ErrorBoundary from "./ErrorBoundary";

class Index extends React.Component{
    componentWillMount(){
        this.props.checkUserLoginState();
    }

    componentDidMount(){
        this.props.initFetch();
    }

    componentDidUpdate(prevProps){
        // react router - 地址更新后将窗口移至顶部
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render(){
        return (
            <ErrorBoundary>
                <div className="website">
                    <header>
                        <Navigation/>
                    </header>

                    <div className="main">
                        <TransitionGroup>
                            <FadeTransition key={this.props.location.pathname}>
                                <Switch location={this.props.location}>

                                    <Route exact strict path="/" component={Home} />
                                    <Route exact strict path="/home" component={Home}/>

                                    <Route path="/article" component={Article} />
                                    <Route path="/msg_board" component={MsgBoard} />
                                    <Route path="/about" component={About} />

                                    <Route path="/error" component={ServerError} />
                                    <Route component={NotFound} />

                                </Switch>
                            </FadeTransition>
                        </TransitionGroup>
                    </div>

                    <footer>
                        <Footer/>
                    </footer>
                </div>
            </ErrorBoundary>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkUserLoginState : () => {
            dispatch(checkUserLoginState());
        },
        initFetch : () => {
            dispatch(listArticles(1,ARTICLE_PAGE_SIZE));
            dispatch(listClassify());
            dispatch(listMsg(1,MSG_PAGE_SIZE));
            dispatch(getAbout());
            dispatch(listCommits(GITHUB_PAGE_SIZE))
        }
    }
};

const IndexContainer = connect(
    null,
    mapDispatchToProps
)(Index);

export default withRouter(IndexContainer)