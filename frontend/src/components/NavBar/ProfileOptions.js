import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileOptions.css'

const UserOptions = ({ user }) => {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
      };

    return (
        <section className="profile-dropdown-user-options" data-drop="true">
          <NavLink exact to={`/channel/${user.id}`}>
            <i className="fa-regular fa-user channel options-icon"/>
            <h1>Your Channel</h1>
          </NavLink>
          <NavLink exact to={`/studio`}>
            <i className="fa-solid fa-cube options-icon"/>
            <h1>FaceCube Studio</h1>
          </NavLink>
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket options-icon"/>
            <h1>Sign Out</h1>
          </button>
        </section>
    )
}

export default UserOptions