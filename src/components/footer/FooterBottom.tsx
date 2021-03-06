import React, { FunctionComponent } from "react";

const FooterBottom: FunctionComponent = () => {
  return (
    <footer>
      <div className="footer-div-main">
        <div className="footer-div-top">
          <div className="footer-div-top-placeholder">
            <a
              href="https://about.instagram.com/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="footer-text"
            >
              About
            </a>
            <a
              href="https://about.instagram.com/blog/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="footer-text"
            >
              Blog
            </a>
            <a href="/about/jobs/" className="footer-text">
              Jobs
            </a>
            <a
              href="https://help.instagram.com/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="footer-text"
            >
              Help
            </a>
            <a href="/developer/" className="footer-text">
              API
            </a>
            <a href="/legal/privacy/" className="footer-text">
              Privacy
            </a>
            <a href="/legal/terms/" className="footer-text">
              Terms
            </a>
            <a href="/directory/profiles/" className="footer-text">
              Top Accounts
            </a>
            <a href="/directory/hashtags/" className="footer-text">
              Hashtags
            </a>
            <a href="/explore/locations/" className="footer-text">
              Locations
            </a>
          </div>
        </div>
        <div className="footer-div-bottom">
          <div className="footer-text">English</div>
          <div className="footer-text">© 2021 Instagram by RM</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBottom;
