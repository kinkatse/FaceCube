import { NavLink } from "react-router-dom";
import AboutLinks from "../NavBar/ProfileAboutLinks";
import "./HamburgerMenu.css"

const HamburgerMenu = () => {

    const topOptions = (
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
    )

    const middleOptions = (
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
    )

    return (
        <>
          {topOptions}
          {middleOptions}
          <AboutLinks type="fromSidebar"/>
        </>
    )
}

export default HamburgerMenu;