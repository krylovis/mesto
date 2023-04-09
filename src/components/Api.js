// fetch(`${baseUrl}/cards`, {
//   headers: {
//     authorization: token
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// const api = new Api({
//   baseUrl: baseUrl,
//   headers: {
//     authorization: token,
//     'Content-Type': 'application/json'
//   }
// });

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if(res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    }).then(this._getResponse)
  }

  getCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    }).then(this._getResponse)
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  editUserInfo(body) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(this._getResponse)
  }

  addCard(body) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(this._getResponse)
  }

  deleteCard(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse)
  }

  addLike(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponse)
  }

  removeLike(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse)
  }

  editAvatar(body) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then(this._getResponse)
  }
}