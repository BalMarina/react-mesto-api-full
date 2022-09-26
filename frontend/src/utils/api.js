class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-type': 'application/json',
      'authorization': 'f36e7156-517e-4278-9213-56884bb1e4f8'
    };
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._checkStatus(res))
  }

  addUser(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(userData)
    })
      .then((res) => this._checkStatus(res))
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then((res) => this._checkStatus(res))
  }

  addCard({ name, link, ...rest }) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name: name, link: link, ...rest })
    })
      .then((res) => this._checkStatus(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkStatus(res))
  }

  // dislikeCard(cardId) {
  //   return fetch(`${this._url}/cards/likes/${cardId}`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   })
  //     .then((res) => this._checkStatus(res))
  // }


  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkStatus(res))
  }

  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => this._checkStatus(res))
  }

}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43')
export default api
