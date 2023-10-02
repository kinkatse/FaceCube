import './ProfileAboutLinks.css'

const AboutLinks = (fromAuth) => {
  let aboutClass = 'profile-dropdown'
  if (fromAuth) {
    aboutClass = 'auth'
  }

  return (
      <section className={`${aboutClass}-about-links`} data-drop="true">
        <a href="https://github.com/kinkatse" target="_blank">
          <i className="fa-brands fa-github link-icon"/>
          <h1>Github</h1>
        </a>
        <a href="https://www.linkedin.com/in/kin-ka-tse/" target="_blank">
          <i className="fa-brands fa-linkedin link-icon"/>
          <h1>LinkedIn</h1>
        </a>
        <a href="https://facenove.herokuapp.com/#/" target="_blank">
          <i className="fa-solid fa-folder-closed link-icon"/>
          <h1>Portfolio</h1>
        </a>
      </section>
  )
}

export default AboutLinks