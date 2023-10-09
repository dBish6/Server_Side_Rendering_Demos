import email from "@front-end/assets/envelope.png";

import Dummy from "@front-end/components/Dummy";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <>
      <Dummy pageTxt="Support Page" />
      <hr />
      <div className="content support">
        <p>
          If you have any questions or would like to collaborate, send me a
          email below or reach out by the socials I listed on the About page.{" "}
          <Link className="link" to="/about">
            About.tsx
          </Link>
        </p>
        <a
          href="mailto:davidbish2002@hotmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={email} className="email" alt="Contact me via Email" />
        </a>
      </div>
    </>
  );
};

export default Support;
