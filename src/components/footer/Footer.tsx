import React from "react";

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-div-main">
        <ul className="footer-ul">
          <li className="footer-li">
            <a className="footer-li-item" href="https://about.instagram.com/">
              About
            </a>
          </li>
          <li className="footer-li">
            <a className="footer-li-item" href="https://help.instagram.com/">
              Help
            </a>
          </li>
          <li className="footer-li">
            <a
              className="footer-li-item"
              href="https://about.instagram.com/blog/"
            >
              Press
            </a>
          </li>
          <li className="footer-li">
            <a className="footer-li-item" href="/developer/">
              API
            </a>
          </li>
          <li className="footer-li">
            <a className="footer-li-item" href="/about/jobs/">
              Jobs
            </a>
          </li>
          <li className="footer-li">
            <a className="footer-li-item" href="/legal/privacy/">
              Privacy
            </a>
          </li>
          <li className="footer-li">
            <a className="footer-li-item _vfM2" href="/legal/terms/">
              Terms
            </a>
          </li>
          <li className="footer-li">
            <a className="footer-li-item" href="/explore/locations/">
              Locations
            </a>
          </li>
          <li className="footer-li">
            <a className="footer-li-item" href="/directory/profiles/">
              Top Accounts
            </a>
          </li>
          <li className="footer-li ">
            <a className="footer-li-item" href="/directory/hashtags/">
              Hashtags
            </a>
          </li>
          <li className="footer-li footer-li-item">Language</li>
        </ul>
        <span className="footer-main-bottom">© 2021 Instagram by RM</span>
      </div>
    </footer>
  );
};

export default Footer;
