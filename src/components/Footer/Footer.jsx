import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <h1 className="footer__title">© 2023 SOTNIKOV. Тестовое задание</h1>
      <h2 className="footer__author">
        от{" "}
        <a
          className="footer__link"
          href="https://rodya.kz/"
          target="_blank"
          rel="noreferrer"
        >
          rodya.kz
        </a>
      </h2>
    </footer>
  );
}

export default Footer;
