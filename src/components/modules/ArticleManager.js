import APIManager from "./APIManager";

// this module will inheirt the 

export default Object.create(APIManager, {
    resource: {
        value: "articles"
    },
    getUser: (id) => {
        return fetch(`http://localhost:5002/users/${id}/${this.resource}/`)
    }
})