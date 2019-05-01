import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../../modules/APICaller"


export default class EventEdit extends Component {
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        url: ""
    }

    componentDidMount () {
        API.getOneEntry("events",this.props.event.id).then(event => {
            this.setState({
              eventName: event.eventName, 
              eventDate: event.targetDate,
              eventLocation: event.eventLocation,
              url: event.url
            })
        })
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
        const editedEvent = {
            userId: parseInt(this.props.activeUser),
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            url: this.state.url
        }
        API.editEntry("events", this.props.event.id, editedEvent).then(()=>{
            this.props.toggle()
        })
        .then(()=> {
            this.props.refreshEvent()
        })

    }


    render(){
        return (
            <Form>
                <FormGroup>
                    <Label for="eventName">Event</Label>
                    <Input 
                    type="text" 
                    required
                    id="eventName"
                    onChange={this.handleFieldChange}
                    value={this.state.eventName}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDate">Date</Label>
                    <Input 
                    type="date" 
                    required
                    id="eventDate"
                    onChange={this.handleFieldChange}
                    value={this.state.eventDate}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="eventLocation">Location</Label>
                    <Input 
                    type="text" 
                    required
                    id="eventLocation"
                    onChange={this.handleFieldChange}
                    value={this.state.eventLocation}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="url">URL</Label>
                    <Input 
                    type="text" 
                    required
                    id="url"
                    onChange={this.handleFieldChange}
                    value={this.state.url}
                    />
                </FormGroup>
                <Button color="primary"
                    onClick={this.handleSubmit}>Submit</Button>
            </Form>
        )
    }

}