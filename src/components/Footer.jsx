import React from "react";
import { footerStyles } from "../assets/dummyStyles";
import { ChevronRight, Clock, Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.topBorder}></div>
      <div className={footerStyles.patternOverlay}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="watchPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="50" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#watchPattern)" />
        </svg>
      </div>

      <div className={footerStyles.mainContainer}>
        <div className={footerStyles.newsletterSection}>
          <div className={footerStyles.newsletterContent}>
            <h3 className={footerStyles.newsletterTitle}>
              Timeless Elegance, Delivered to Your Inbox
            </h3>
            <p className={footerStyles.newsletterText}>
              Subscribe to our newsletter for exclusive offers, new arrivals,
              and the latest in watch trends.
            </p>

            <div className={footerStyles.formContainer}>
              <input
                type="email"
                placeholder="Your email address"
                className={footerStyles.emailInput}
              />
              <button className={footerStyles.subscribeButton}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className={footerStyles.mainGrid}>
          <div className={footerStyles.brandSection}>
            <div className={footerStyles.brandContainer}>
              <div className={footerStyles.brandIconContainer}>
                <div className={footerStyles.brandIconPing}></div>
                <Clock className={footerStyles.brandIcon} />
              </div>
              <span className={footerStyles.brandName}>TimeStone</span>
            </div>
            <p className={footerStyles.brandDescription}>
              Discover the perfect blend of craftsmanship and style with our
              exclusive collection of luxury timepieces.
            </p>
          </div>
          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Explore
            </h3>

            <ul className={footerStyles.linksList}>
              {[
                { label: "Collections", href: "/watches" },
                { label: "New Arrivals", href: "/watches" },
                { label: "Best Sellers", href: "/watches" },
                { label: "Limited Editions", href: "/watches" },
                { label: "Our Story", href: "/watches" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className={footerStyles.linkItem}>
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Support
            </h3>
            <ul className={footerStyles.linksList}>
              {[
                "Contact Us",
                "Shipping & Returns",
                "Product Care",
                "Report a Bug",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="https://github.com/Anirudh-Negii/timestone/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerStyles.linkItem}
                  >
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Connect
            </h3>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  New Delhi, India
                </span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  +91 9999 999 999
                </span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  info@timestone.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={footerStyles.bottomSection}>
          <p className={footerStyles.copyright}>
            &copy; {new Date().getFullYear()} TimeStone | Quality watches,
            timeless experiences.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <p className={footerStyles.designerLink}>
              Designed with <Heart className={footerStyles.heartIcon} /> by
              Anirudh Negi
            </p>
          </div>
        </div>
      </div>

      <style>{footerStyles.mediaQueries}</style>
    </footer>
  );
};

export default Footer;
