import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from "react-redux";

import RouteIndex from "./RouteIndex";
import EditContent from "./content/edit/EditContent"
import JustifyContent from "./content/JustifyContent";
import FullContent from "./content/FullContent";

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
                    <Route exact strict path={`${path}/content/:id/full`} component={FullContent}/>
                    <Route exact strict path={`${path}/content/:id/justify`} component={JustifyContent} />
                    {
                        this.props.management &&
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
        management : state.login.management,
    }
};

const IndexContainer = connect(
    mapStateToProps,
    null
)(Index);

export default withRouter(IndexContainer)