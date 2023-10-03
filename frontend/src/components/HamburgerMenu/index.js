import { NavLink } from "react-router-dom";
import "./HamburgerMenu.css"

const HamburgerMenu = () => {

    return (
        <div>
          <section className={`hamburger-about-links`} data-drop="true">
            <NavLink exact to={`/`}>
              <i className="fa-solid fa-house sidebar-icon"/>
              <h1>Home</h1>
            </NavLink>
            <NavLink exact to={`/`}>
              <i className="fa-solid fa-users-line sidebar-icon"/>
              <h1>Subscriptions</h1>
            </NavLink>
          </section>
          <section className={`hamburger-about-links`} data-drop="true">
            <NavLink exact to={`/`}>
              <i className="fa-solid fa-cube sidebar-icon"/>
              <h1>Your Videos</h1>
            </NavLink>
            <NavLink exact to={`/`}>
              <i className="fa-solid fa-clock-rotate-left sidebar-icon"/>
              <h1>History</h1>
            </NavLink>
            <NavLink exact to={`/`}>
              <i className="fa-solid fa-thumbs-up sidebar-icon"/>
              <h1>Liked Videos</h1>
            </NavLink>
          </section>
          <section className={`hamburger-about-links`} data-drop="true">
            <a href="https://github.com/kinkatse" target="_blank">
              <i className="fa-brands fa-github sidebar-icon"/>
            <h1>Github</h1>
            </a>
            <a href="https://www.linkedin.com/in/kin-ka-tse/" target="_blank">
              <i className="fa-brands fa-linkedin sidebar-icon"/>
            <h1>LinkedIn</h1>
            </a>
            <a href="https://facenove.herokuapp.com/#/" target="_blank">
              <i className="fa-solid fa-folder-closed sidebar-icon"/>
            <h1>Portfolio</h1>
            </a>
          </section>
        </div>
    )
}

export default HamburgerMenu;