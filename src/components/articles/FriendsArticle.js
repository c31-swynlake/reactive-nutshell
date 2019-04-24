import React, { Component } from 'react'
import { CardText, CardTitle } from 'reactstrap';


export default class FriendsArticle extends Component {
    render() {
        return(
            <React.Fragment key={this.props.TheArticle.id}>
                <CardTitle>
                    {this.props.TheArticle.title}
                </CardTitle>
                <CardText>
                    {this.props.TheArticle.synopsis}
                </CardText>
            </React.Fragment>
        )
    }
}