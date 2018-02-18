import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import { connect } from 'react-redux'

import { history } from "../../store/Store";

import Navigation from './Navigation'
import Footer from './Footer'

import Home from '../home/Index'
import Article from '../article/Index'
import MsgBoard from '../msgboard/Index'
import About from '../about/Index'

import {ARTICLE_PAGE_SIZE, MSG_PAGE_SIZE} from "../../Constant";

import {listArticles} from "../../action/article/ArticlesAction";
import {listClassify} from "../../action/article/ClassifyAction";
import {getAbout} from "../../action/about/AboutAction";
import {checkUserLoginState} from "../../action/user/UsersAction";

import '../../static/css/common/common.css'
import {listMsg} from "../../action/msgboard/MsgBoardAction";

class Index extends React.Component{
    componentWillMount(){
        this.props.checkUserLoginState();
    }

    componentDidMount(){
        this.props.initFetch();
    }

    render(){
        return (
            <div>
                <NotificationsSystem theme={theme}/>
                <Router history={history}>
                    <div className="website">
                        <header>
                            <Navigation/>
                        </header>

                        <div className="main">
                            <Route exact strict path="/" component={Home} />
                            <Route exact strict path="/home" component={Home}/>
                            <Route path="/article" component={Article} />
                            <Route path="/msg_board" component={MsgBoard} />
                            <Route path="/about" component={About} />
                        </div>

                        <footer>
                            <Footer/>
                        </footer>
                    </div>
                </Router>
            </div>
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
            dispatch(getAbout())
        }
    }
};

const IndexContainer = connect(null,mapDispatchToProps)(Index);

export default IndexContainer