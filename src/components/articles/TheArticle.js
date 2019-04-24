import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { CardText, CardTitle, Button } from 'reactstrap';
import ArticleEdit from './ArticlesEdit'
import { withRouter } from 'react-router'

class TheArticle extends Component {


    handleButton = (event) => {
        let target = event.target.parentNode

    }

    render() {
        return(
            <React.Fragment key={this.props.TheArticle.id}>
                <CardTitle>
                    {this.props.TheArticle.title}
                </CardTitle> 
                <CardText>
                    {this.props.TheArticle.synopsis}
                </CardText>
                <Button color="primary"
                onClick={
                    <ArticleEdit artticleId={this.props.TheArticle.id} />
                }
                >
                Edit</Button>
                <Button color="danger"
                onClick={() => {
                    this.props.deleteArticle(this.props.TheArticle.id)
                }}
                >
                Delete</Button>
            </React.Fragment>
        )
    }
}

export default withRouter(TheArticle)