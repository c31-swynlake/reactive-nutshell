import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ArticlesManager from '../../modules/ArticleManager'


export default class ArticlesEdit extends Component {
    // set the intial state
    state = {
        userId: parseInt(this.props.activeUser),
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
            id: parseInt(this.props.match.params.articleId),
            userId: this.props.activeUser,
            url: this.state.url,
            title: this.state.title,
            synopsis: this.state.synopsis
        }

        this.props.updateArticle(editedArticle, this.props.match.params.articleId)
    }

    render(){
        return (
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                    type="text" 
                    required
                    id="title"
                    value={this.state.title}
                    onChange={this.handleFieldChange}
                    placeholder="Enter a title"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="synopsis">Synopsis</Label>
                    <Input 
                    type="text" 
                    required
                    value={this.state.synopsis}
                    id="synopsis"
                    onChange={this.handleFieldChange}
                    placeholder="Enter the synopsis"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="url">URL</Label>
                    <Input 
                    type="text" 
                    required
                    id="url"
                    value={this.state.url}
                    onChange={this.handleFieldChange}
                    placeholder="Enter the url"
                    />
                </FormGroup>
                <Button color="primary"
                    onClick={this.updateArticle}>Add</Button>
            </Form>
        )
    }

}