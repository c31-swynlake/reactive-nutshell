import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle } from 'reactstrap';

export default class ArticlesList extends Component {
    // userId = sessionStorage.getItem("credentials.userId")
    userId = 1;
    render () {
        // console.log(this.props.articles)
        return (
            <div>
                {
                    this.props.articles.find(article => article.userId === userId

                    )
                }
            </div>
        )
    }
}