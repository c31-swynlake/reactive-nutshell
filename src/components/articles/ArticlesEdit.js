import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ArticlesManager from '../../modules/ArticleManager'


export default class ArticlesEdit extends Component {
    // set the intial state
    state = {
        userId: this.props.activeUser,
        url: "",
        title: "",
        synopsis: ""
    }

    // this will handle change of the input fields
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }


    componentDidMount() {
        ArticlesManager.get(this.props.match.params.articleId)
        .then(animal => {
            this.setState({
                userId: parseInt(this.props.activeUser),
                url: animal.url,
                title: animal.title,
                synopsis: animal.synopsis
            })
        })
    }

    // update the article
    updateArticle = event => {
        // prevent the page from going to another page
        event.preventDefault()

        const editedArticle = {
            id: this.props.match.params.articleId,
            userId: this.props.activeUser,
            url: this.state.url,
            title: this.state.title,
            synopsis: this.state.synopsis
        }

        this.props.updateArticle(editedArticle, this.props.match.params.articleId)
    }


}