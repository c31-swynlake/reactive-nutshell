import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class ArticlesForm extends Component {
    state = {
        userId: this.props.activeUser,
        url: "", 
        title: "",
        synopsis: ""
    }

    // handle the field change when the input box is edited
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    constructNewArticle = event => {
        event.preventDefault();
        if(this.state.url ===""){
            alert("Please enter an url")
        }else if(this.state.title === ""){
            alert("Please enter a title")
        }else if(this.state.synopsis === ""){
            alert("Please enter a synopsis")
        }else{
            const newArticle = {
                userId: parseInt(this.props.activeUser),
                url: this.state.url,
                title: this.state.title,
                synopsis: this.state.synopsis
            }
            // add the new article 
            this.props.addArticle(newArticle)
            // .then(() => this.props.history.push("/news"))
        }
    }
    

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                    type="text" 
                    required
                    id="title"
                    onChange={this.handleFieldChange}
                    placeholder="Enter a title"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="synopsis">Synopsis</Label>
                    <Input 
                    type="text" 
                    required
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
                    onChange={this.handleFieldChange}
                    placeholder="Enter the url"
                    />
                </FormGroup>
                <Button color="primary"
                    onClick={this.constructNewArticle}>Add</Button>
            </Form>
        )
    }
}