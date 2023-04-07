// const token = '14893dca-a279-433c-a27c-967896487d71';
// const cohort = 'cohort-63';
// const baseUrl = `https://mesto.nomoreparties.co/v1/${cohort}`;

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
}