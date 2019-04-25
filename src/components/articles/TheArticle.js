import React, { Component } from 'react'
// import { Route, Redirect } from "react-router-dom"
import { CardText, CardTitle, Button } from 'reactstrap';
import ArticlesEdit from './ArticlesEdit'
import { withRouter } from 'react-router'

class TheArticle extends Component {
    state = {
        displayEditForm: false
    }

    // this function will set the displayEditForm will set the condition to true
    displayEditComponent = () => {
        console.log("test")
        this.setState({
            displayEditForm: true
        })
    }

    // this function will set the displayeditform condition to false and the form will disapper

    render() {
        return (
            <React.Fragment key={this.props.TheArticle.id}>
                <CardTitle>
                    {this.props.TheArticle.title}
                </CardTitle>
                <CardText>
                    {this.props.TheArticle.synopsis}
                </CardText>
                <Button color="primary"
                    onClick={this.displayEditComponent}
                >
                    Edit</Button>
                {this.state.displayEditForm && <ArticlesEdit updateArticle={this.props.updateArticle} articleId={this.props.TheArticle.id} />}
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