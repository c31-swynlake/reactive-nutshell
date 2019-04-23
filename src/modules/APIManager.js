/*
This module will hold the parent fetch calls that will be inheireted by the following:
- ArticleManager.js
- ChatManager.js
- EventManager.js
- FriendManager.js
- TaskManager.js
*/

const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    resource: {
        value: ""
    },
    all: {
        value: function () {
            return fetch(`${remoteURL}/${this.resource}`).then(r => r.json())
        }
    },
    get: {
        value: function (id) {
            return fetch(`${remoteURL}/${this.resource}/${id}`).then(r => r.json())
        }
    },
    post: {
        value: function (object) {
            return fetch(`${remoteURL}/${this.resource}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(object)
            }).then(r => r.json())
        }
    }
})
