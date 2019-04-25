import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../../modules/APICaller"


export default class PostEvent extends Component {
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        url: ""
    }

    // handle the field change when the input box is edited
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        // prevent the page from going to another page
        event.preventDefault()
        const newEvent = {
            userId: parseInt(this.props.activeUser),
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            url: this.state.url
        }
        API.postOne("events", newEvent)
        .then(()=> {
            this.props.refreshEvent()
        })

    }


    render(){
        return (
            <Form className="post-event">
                <FormGroup>
                    <Label for="eventName">Event Name</Label>
                    <Input 
                    type="text" 
                    required
                    id="eventName"
                    onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDate">Date</Label>
                    <Input 
                    type="date" 
                    required
                    id="eventDate"
                    onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="eventLocation">Location</Label>
                    <Input 
                    type="text" 
                    required
                    id="eventLocation"
                    onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="url">URL</Label>
                    <Input 
                    type="text" 
                    required
                    id="url"
                    onChange={this.handleFieldChange}
                    />
                </FormGroup>
                <Button color="primary"
                    onClick={this.handleSubmit}>Submit</Button>
            </Form>
        )
    }

}