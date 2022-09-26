import '../index.css';

function ImagePopup(props) {
  return (
    <div className={`popup popup-pic ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup-pic__content">
        <button className="popup__close-icon"
          type="button"
          onClick={props.onClose}
        />
        <img className="popup-pic__photo"
          alt=''
          src={props.card ? props.card.link : ''} />
        <span className="popup-pic__alt">{props.card ? props.card.name : ''}</span>
      </div>
    </div>
  );
}

export default ImagePopup;
