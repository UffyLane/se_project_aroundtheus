class Api {
    constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    }
  
    getInitialCards() {
         return fetch(`${this.baseUrl}/cards`, {
              headers: this.headers
            })
            .then(res => res.json());
          }
        
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => res.json());
          }
        
          fetchInitialData() {
            return Promise.all([this.getUserInfo(), this.getInitialCards()]);
          }
        }
        
        const api = new Api({
          baseUrl: "https://around-api.en.tripleten-services.com/v1",
          headers: {
            authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
            "Content-Type": "application/json"
          }
        });
        
        // Fetch initial data
        api.fetchInitialData()
          .then(([userData, cardsData]) => {
           console.log(userData);
           console.log(cardsData);
          })
          .catch(err => {
            console.error(err);
          });