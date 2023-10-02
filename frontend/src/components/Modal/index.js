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
    const handleCloseModal = () => {
        dispatch(closeModal());
    }

    let modalComponent;
    let modalHeaderText;
    switch(modal.type) {
      case 'signup':
        modalHeaderText = 'Sign Up';
        modalComponent = <SignupForm handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>;
        break;
      case 'login':
        modalHeaderText = 'Login';
        modalComponent = <LoginForm handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>;
        break;
      default:
        modalComponent = null;
    }

    if (!modalComponent) return null;

    return (
      <div className="modal">
        <div className="modal-background" onClick={handleCloseModal}></div>
        <div className="modal-whole">
          <header className="modal-header">
            <h1>{modalHeaderText}</h1>
            <button onClick={handleCloseModal} className="modal-close">
              <i className="fa-solid fa-xmark"/>
            </button>
          </header>
          {modalComponent}
        </div>
      </div>
    )
}

export default Modal;