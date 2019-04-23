import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

export default class TheArticle extends Component {

    render() {
        return(
            <React.Fragment key={this.props.TheArticle.id}>
                <CardTitle>
                    {TheArticle.title}
                </CardTitle>
            </React.Fragment>
        )
    }
}