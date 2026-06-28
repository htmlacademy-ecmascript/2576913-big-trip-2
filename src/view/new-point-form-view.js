import PointFormView from './point-form-view.js';

export default class NewPointFormView extends PointFormView {
  #handleCancelClick = null;

  constructor({ point, allDestinations, destination, allOffers, offers, selectedOffers, onFormSubmit, onCancelClick }) {
    super({ point, allDestinations, destination, allOffers, offers, selectedOffers, onFormSubmit });
    this.#handleCancelClick = onCancelClick;
    this._restoreHandlers();
  }

  _getFormMode() {
    return 'new';
  }

  _restoreSpecificHandlers() {
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
  }

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };
}
