import githubLogo from "@front-end/assets/github.svg";
import linkedinLogo from "@front-end/assets/linkedIn.svg";
import email from "@front-end/assets/envelope.png";

import Dummy from "@front-end/components/Dummy";

const About = () => {
  return (
    <>
      <Dummy pageTxt="About Page" />
      <hr />
      <div className="content about">
        <p>
          Developer: <span>David Bishop</span>
        </p>
        <div>
          <a
            href="https://github.com/dBish6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} className="github" alt="View my GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/d-bish/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedinLogo}
              className="linkedin"
              alt="Contact me via Linkedin"
            />
          </a>
          <a
            href="mailto:davidbish2002@hotmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={email} className="email" alt="Contact me via Email" />
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
