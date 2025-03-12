export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => res.json());
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => res.json());
  }

  fetchInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      })

        .then((res) =>
          res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
        )
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {}),
    });
  }
}
