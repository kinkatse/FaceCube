import './ProfileHeader.css'

const ProfileHeader = ({ user }) => {

    return (
        <header className="profile-dropdown-header" data-drop="true">
          <i className="fa-solid fa-user user-pic-icon" data-drop="true"/>
          <div className="profile-dropdown-details" data-drop="true">
            <h1>{user.firstname} {user.lastname}</h1>
            {/* <h1 data-drop="true">Kin Ka Tse</h1> */}
            <h2 data-drop="true">{user.username}</h2>
            <h2 data-drop="true">{user.email}</h2>
            <button data-drop="true">Edit User Info</button>
          </div>
        </header>
    )
}

export default ProfileHeader