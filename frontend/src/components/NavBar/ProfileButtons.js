import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import AboutLinks from "./ProfileAboutLinks";
import UserOptions from "./ProfileOptions";

const ProfileButtons = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = (e) => {
    if (e.target.dataset.drop === 'true') return
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;
    // Listening for any click on the page, so then it invokes the close Menu function
    document.addEventListener('click', closeMenu);
  
    return () => {
      document.removeEventListener("click", closeMenu);
    }
  }, [showMenu]);

  return (
    <>
      <button onClick={openMenu} className="dropdown-button">
        <i className="fa-solid fa-user navbar-user-icon"/>
      </button>
      {showMenu && (
        <div className="profile-dropdown-whole">
          <ProfileHeader user={user}/>
          <UserOptions user={user}/>
          <AboutLinks/>
        </div>
      )}
    </>
  );
}

export default ProfileButtons;