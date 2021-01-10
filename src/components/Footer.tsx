import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer_div_main">
        <div className="footer_div_top">
          <div className="footer_div_top_placeholder">
            <a
              href="https://about.instagram.com/"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              About
            </a>
            <a
              href="https://about.instagram.com/blog/"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Blo
            </a>
            <a href="/about/jobs/">Jobs</a>
            <a
              href="https://help.instagram.com/"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Help
            </a>
            <a href="/developer/">API</a>
            <a href="/legal/privacy/">Privacy</a>
            <a href="/legal/terms/">Terms</a>
            <a href="/directory/profiles/">Top Accounts</a>
            <a href="/directory/hashtags/">Hashtags</a>
            <a href="/explore/locations/">Locations</a>
          </div>
          <div className="footer_div_bottom_placeholder">
            <a href="/topics/beauty/">Beauty</a>
            <a href="/topics/dance-and-performance/">Dance &amp; Performance</a>
            <a href="/topics/fitness/">Fitness</a>
            <a href="/topics/food-and-drink/">Food &amp; Drink</a>
            <a href="/topics/home-and-garden/">Home &amp; Garden</a>
            <a href="/topics/music/">Music</a>
            <a href="/topics/visual-arts/">Visual Arts</a>
          </div>
        </div>
        <div className="footer_div_bottom">
          <div className="footer_div_text">English</div>
          <div className="footer_div_text">© 2021 Instagram from Facebook</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
