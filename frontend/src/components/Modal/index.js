import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/modal";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import logo from "../../assets/youtube-logo.png"
import './Modal.css'

const Modal = () => {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.ui.modal);

    const handleOpenModal = (modalType) => {
      dispatch(openModal(modalType));
    }
    const handleCloseModal = () => {
      const modalBackgroundEl = document.getElementsByClassName('modal-background')[0]
      modalBackgroundEl.classList.add("after-close")

      if (modal.type === "sidebar") {
        const sidebarEl = document.getElementsByClassName('sidebar-whole')[0]
        sidebarEl.classList.add("after-close")
      } else {
        const modalEl = document.getElementsByClassName('modal-whole')[0]
        modalEl.classList.add("after-close")
      }

      setTimeout(() => {
        dispatch(closeModal());
      }, 300)
    }

    let modalComponent;
    let modalHeaderText;
    let modalType = "modal"
    let iconButton = (
      <button onClick={handleCloseModal} className="modal-close">
        <i className="fa-solid fa-xmark"/>
      </button>
    )
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
        iconButton = (
          <button onClick={handleCloseModal} className="hamburger-menu">
            <i className="fa-solid fa-bars"/>
          </button>
        )
        modalComponent = <HamburgerMenu handleCloseModal={handleCloseModal}/>;
        break;
      default:
        modalComponent = null;
    }
    
    const renderHeader = () => {
      if (modalType === "sidebar") {
        return (
          <>
            {iconButton}
            <NavLink exact to={`/`} onClick={handleCloseModal} className="logo-container">
              <img src={logo} className="youtube-logo"/>
            </NavLink>
          </>
        )
      } else {
        return (
          <>
            <h1>{modalHeaderText}</h1>
            {iconButton}
          </>
        )
      }
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
            {renderHeader()}
          </header>
          {modalComponent}
        </div>
      </div>
    )
}

export default Modal;