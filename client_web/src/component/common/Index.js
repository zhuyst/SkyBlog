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

import {checkUserLoginState} from "../../action/user/UsersAction";

import '../../static/css/common/common.css'
import {listArticles} from "../../action/article/ArticlesAction";
import {ARTICLE_PAGE_SIZE} from "../../Constant";
import {listClassify} from "../../action/article/ClassifyAction";

class Index extends React.Component{
    componentWillMount(){
        this.props.checkUserLoginState();
    }

    componentDidMount(){
        this.props.initArticles();
        this.props.initClassify();
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
        initArticles : () => {
            dispatch(listArticles(1,ARTICLE_PAGE_SIZE))
        },
        initClassify : () => {
            dispatch(listClassify())
        }
    }
};

const IndexContainer = connect(null,mapDispatchToProps)(Index);

export default IndexContainer