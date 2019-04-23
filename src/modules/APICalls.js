const apiBaseUrl = "http://localhost:5002"


const API = {
  getOneEntry(endpoint, id) {
    return fetch(`${apiBaseUrl}/${endpoint}/${id}`).then(res => res.json());
  },
  getAll(endpoint) {
    return fetch(`${apiBaseUrl}/${endpoint}`).then(res => res.json());
  },
  postOne(endpoint, entry) {
    return fetch(`${apiBaseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });
  },
  deleteEntry(endpoint, entryID) {
    return fetch(`${apiBaseUrl}/${endpoint}/${entryID}`, {
      method: "DELETE"
    }).then(res => res.json());
  },
  patchEntry(endpoint, entryID, entry){
    return fetch(`${apiBaseUrl}/${endpoint}/${entryID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  },
  editEntry(endpoint, entryID, entry){
    return fetch(`${apiBaseUrl}/${endpoint}/${entryID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  }
};

export default API