import '../index.css';

function PopupWithForm(props) {
  return (
    <div className="page">
      <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className={"popup__container"}>
          <form
            name={`${props.name}-form`}
            className={"popup__form"}
            noValidate=""
            onSubmit={props.onSubmit}>
            <button
              className={"popup__close-icon"}
              type="button"
              onClick={props.onClose} />
            <h2 className={"popup__head"}>{props.title}</h2>
            <>{props.children}</>
            <button
              className={"popup__submit"}
              type="submit"
            >{props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
