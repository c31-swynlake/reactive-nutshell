import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle } from 'reactstrap';

export default class ArticlesList extends Component {
    userId = sessionStorage.getItem("credentials.userId")
    render () {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Articles</CardTitle>
                        <CardText>
                            {
                                this.state.
                            }
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}