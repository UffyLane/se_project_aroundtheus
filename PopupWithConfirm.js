import Popup from "../components/Popup";

class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
      super(popupSelector, submitFunction, _submitFunction); 
     
      }
    
  
   

    setSubmitFunction(submitFunction) {
            this._submitFunction = submitFunction;
          }
    
  
    setEventListeners() {
        super.setEventListeners();
        
        this._popupForm.addEventListener('submit',(evt) => {
          evt.preventDefault();
          this._submitFunction(this._submitFunction()); 
        this.close();
        } );
    }
}