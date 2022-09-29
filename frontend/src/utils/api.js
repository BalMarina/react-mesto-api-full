function getHeaders() {
  return {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  }
}
class Api {
  constructor(url) {
    this._url = url;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: getHeaders()
    })
      .then((res) => this._checkStatus(res))
  }

  addUser(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: getHeaders(),
      method: 'PATCH',
      body: JSON.stringify(userData)
    })
      .then((res) => this._checkStatus(res))
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: getHeaders()
    })
      .then((res) => this._checkStatus(res))
  }

  addCard({ name, link, ...rest }) {
    return fetch(`${this._url}/cards`, {
      headers: getHeaders(),
      method: 'POST',
      body: JSON.stringify({ name: name, link: link, ...rest })
    })
      .then((res) => this._checkStatus(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: getHeaders(),
    })
      .then((res) => this._checkStatus(res))
  }

  // dislikeCard(cardId) {
  //   return fetch(`${this._url}/cards/likes/${cardId}`, {
  //     method: 'DELETE',
  //     headers: getHeaders(),
  //   })
  //     .then((res) => this._checkStatus(res))
  // }


  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
      .then((res) => this._checkStatus(res))
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })
      .then((res) => this._checkStatus(res))
  }

}

const api = new Api(process.env.REACT_APP_API_URI || 'http://localhost:4000')
export default api
