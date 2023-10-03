import './ProfileAboutLinks.css'

const AboutLinks = ({ type }) => {
  let aboutClass = 'profile-dropdown';
  let icon = "link-icon";
  switch(type) {
    case "fromAuth":
      aboutClass = 'auth';
      break;
    case "fromSidebar":
      aboutClass = 'hamburger';
      icon = 'sidebar-icon';
      break;
    default:
      aboutClass = 'profile-dropdown';
      break;
  }

  return (
      <section className={`${aboutClass}-about-links`} data-drop="true">
        <a href="https://github.com/kinkatse" target="_blank">
          <i className={`fa-brands fa-github ${icon}`}/>
          <h1>Github</h1>
        </a>
        <a href="https://www.linkedin.com/in/kin-ka-tse/" target="_blank">
          <i className={`fa-brands fa-linkedin ${icon}`}/>
          <h1>LinkedIn</h1>
        </a>
        <a href="https://facenove.herokuapp.com/#/" target="_blank">
          <i className={`fa-solid fa-folder-closed ${icon}`}/>
          <h1>Portfolio</h1>
        </a>
      </section>
  )
}

export default AboutLinks