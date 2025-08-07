import { Link } from "react-router-dom";
import Dummy from "../components/Dummy";

export default function Support() {
  return (
    <>
      <Dummy title="Support Page" />
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
          className="icon"
        >
          <img src="/images/envelope.png" alt="Contact me via Email" />
        </a>
      </div>
    </>
  );
}
