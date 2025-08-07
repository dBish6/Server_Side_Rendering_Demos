import Dummy from "../components/Dummy";

export default function About() {
  return (
    <>
      <Dummy title="About Page" />
      <hr />
      <div className="content about">
        <p>
          Developer:{" "}
          <a
            href="https://davidbishop.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            David Bishop
          </a>
        </p>
        <div>
          <a
            href="https://github.com/dBish6"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <img src="/images/github.svg" alt="View my GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/d-bish/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <img src="/images/linkedin.svg" alt="Contact me via Linkedin" />
          </a>
          <a
            href="https://www.buymeacoffee.com/dBish"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <img
              src="/images/buy-me-a-coffee.svg"
              className="coffee"
              alt="Buy me a Coffee"
            />
          </a>
          <a
            href="mailto:davidbish2002@hotmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <img src="/images/envelope.png" alt="Contact me via Email" />
          </a>
        </div>
      </div>
    </>
  );
}
