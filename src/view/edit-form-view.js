import PointFormView from './point-form-view.js';

export default class EditFormView extends PointFormView {
  #handleDeleteClick = null;
  #handleCloseClick = null;

  constructor({ point, allDestinations, destination, allOffers, offers, selectedOffers, onFormSubmit, onCloseClick, onDeleteClick }) {
    super({ point, allDestinations, destination, allOffers, offers, selectedOffers, onFormSubmit });
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  _getFormMode() {
    return 'edit';
  }

  _restoreSpecificHandlers() {
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
  }

  reset(point, destination, offers, selectedOffers) {
    this.updateElement(
      EditFormView.parsePointToState(point, destination, offers, selectedOffers),
    );
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };
}
