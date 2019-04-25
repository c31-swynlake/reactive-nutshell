import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { CardText, CardTitle, Button } from 'reactstrap';
import ArticlesEdit from './ArticlesEdit'
import { withRouter } from 'react-router'

class TheArticle extends Component {


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
                    <ArticlesEdit articleId={this.props.TheArticle.id} />
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