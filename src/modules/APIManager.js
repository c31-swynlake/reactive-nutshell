const remoteURL = "http://localhost:5002"

export default {

  getEntry(endpoint, id) {
    return fetch(`${remoteURL}/${endpoint}/${id}`).then(res => res.json());
  },

  getAllEntries(endpoint) {
    return fetch(`${remoteURL}/${endpoint}`).then(res => res.json());
  },

  postEntry(endpoint, entry) {
    return fetch(`${remoteURL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });
  },

  deleteEntry(endpoint, entryID) {
    return fetch(`${remoteURL}/${endpoint}/${entryID}`, {
      method: "DELETE"
    }).then(res => res.json());
  },

  patchEntry(endpoint, entryID, entry){
    return fetch(`${remoteURL}/${endpoint}/${entryID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  },

  editEntry(endpoint, entryID, entry){
    return fetch(`${remoteURL}/${endpoint}/${entryID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  }
};