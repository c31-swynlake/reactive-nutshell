import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ArticleManager from '../../modules/ArticleManager'
import { stat } from 'fs';

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
                userId: this.props.activeUser,
                url: this.state.url,
                title: this.state.title,
                synopsis: this.state.synopsis
            }

            ArticleManager.post(newArticle)
            
        }
    }
    

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="">Title</Label>
                    <Input 
                    type="text" 
                    name="title"
                    required
                    id="title"
                    placeholder="Enter a title"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="">Synopsis</Label>
                    <Input 
                    type="text" 
                    name="synopsis"
                    required
                    id="synopsis"
                    placeholder="Enter the synopsis"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="">URL</Label>
                    <Input 
                    type="text" 
                    name="url"
                    required
                    id="url"
                    placeholder="Enter the url"
                    />
                </FormGroup>
                <Button color="primary">Add</Button>
            </Form>
        )
    }
}