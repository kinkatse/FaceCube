import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/modal";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import './Modal.css'

const Modal = () => {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.ui.modal);

    const handleOpenModal = (modalType) => {
        dispatch(openModal(modalType));
    }

    let modalComponent;
    let modalHeaderText;
    switch(modal.type) {
      case 'signup':
        modalHeaderText = <h1>Signup Modal</h1>;
        modalComponent = <SignupForm handleOpenModal={handleOpenModal}/>;
        break;
      case 'login':
        modalHeaderText = <h1>Login Modal</h1>;
        modalComponent = <LoginForm handleOpenModal={handleOpenModal}/>;
        break;
      default:
        modalComponent = null;
    }

    const handleClose = () => {
        dispatch(closeModal());
    }

    if (!modalComponent) return null;

    return (
      <div className="modal">
        <div className="modal-background" onClick={handleClose}></div>
        <div className="modal-whole">
          <header className="modal-header">
            {modalHeaderText}
            <button onClick={handleClose} className="modal-close">
              <i className="fa-solid fa-xmark"/>
            </button>
          </header>
          {modalComponent}
        </div>
      </div>
    )
}

export default Modal;