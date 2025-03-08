class Api {
    constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this._authToken = options._authToken;
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


  addCard({name, link}) {
    return fetch(`${this.baseUrl}/users/cards`, {
        method: "POST",
        headers: {
          authorization: this_authToken, "Content-Type": "application/json"
        },
      
        body: JSON.stringify({
          name,
          link
        })
      
        .then(res => res.ok ? res.json(): Promise.reject(`Error: ${res.status}`))
        .catch((err) => {
          console.error(err); 
        })
        .finally(()=>{
      })
    })

    }}
      
        
      
      
        
      
      
       
      
      
        
      
      
       


    
       