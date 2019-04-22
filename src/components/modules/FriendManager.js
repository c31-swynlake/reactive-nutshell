import APIManager from "./APIManager";

// this module will handle the events fetch calls that are inheirted 
export default Object.create(APIManager, {
    resource: {
        value: "friends"
    }
})