import { useEffect } from "react";
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
    let modalType = "modal"
    switch(modal.type) {
      case 'signup':
        modalHeaderText = 'Sign Up';
        modalComponent = <SignupForm handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>;
        break;
      case 'login':
        modalHeaderText = 'Login';
        modalComponent = <LoginForm handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>;
        break;
      case 'sidebar':
        modalHeaderText = 'FaceCube';
        modalType = 'sidebar'
        // modalComponent = <LoginForm handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}/>;
        break;
      default:
        modalComponent = null;
    }
    
    useEffect(() => {
        if (!modalComponent) return;
        const body = document.body
        body.style.overflow = "hidden"
        return () => {
            body.style.overflow = ""
        }
    }, [modalComponent])

    if (!modalComponent) return null;

    return (
      <div className="modal">
        <div className="modal-background" onClick={handleCloseModal}></div>
        <div className={`${modalType}-whole`}>
          <header className={`${modalType}-header`}>
            {modalType === "modal" &&
              <>
                <h1>{modalHeaderText}</h1>
                <button onClick={handleCloseModal} className="modal-close">
                    <i className="fa-solid fa-xmark"/>
                </button>
              </>
            }
          </header>
          {modalComponent}
        </div>
      </div>
    )
}

export default Modal;