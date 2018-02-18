import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from "react-redux";

import RouteIndex from "./RouteIndex";
import Content from './content/Content'
import EditContent from "./content/edit/EditContent"

import '../../static/css/article/article.css'

class Index extends React.Component{
    componentWillMount(){
        document.title = "博客文章 - 青云的小窝"
    }

    render(){
        const path = this.props.match.path;

        return(
            <div className="articles_main">
                <Switch>
                    <Route exact strict path={`${path}/content/:id`} component={Content}/>
                    {
                        this.props.admin &&
                        <Route path={`${path}/content/:id/edit`} component={EditContent} />
                    }
                    <Route component={RouteIndex}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin : state.login.user.admin,
    }
};

const IndexContainer = connect(
    mapStateToProps,
    null
)(Index);

export default withRouter(IndexContainer)