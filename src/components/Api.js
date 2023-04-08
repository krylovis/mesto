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
}