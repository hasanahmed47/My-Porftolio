import { useState } from "react";

import { lenis } from "../hooks/useScroll";

import "./Footer.css";


const PHONE_NUMBER =
  import.meta.env.VITE_PHONE_NUMBER || "+923313375776";

const PHONE_HREF = `tel:${PHONE_NUMBER}`;

const SHOW_ATTRIBUTION =
  import.meta.env.VITE_SHOW_ATTRIBUTION !== "false";


function Footer({
  withSocial = true,
  className = "",
}) {
  const [focused, setFocused] = useState(false);

  const handleBackToTop = () => {
    if (!lenis?.value) {
      return;
    }

    lenis.value.scrollTo(0);
  };


  const handleBackKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      handleBackToTop();
    }
  };


  return (
    <>
      <footer
        className={[
          "footer",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >

      {/* ==========================================
          NOTCH
      ========================================== */}

      <div className="footer-notch">
        <span className="footer-notch-shape" />
        <span className="footer-notch-shape footer-notch-shape-right" />
      </div>


      <div className="footer-content">

        {/* ========================================
            DECORATIVE ORBIT
        ======================================== */}

        <div
          className="footer-orbit"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>


        {/* ========================================
            HEADING
        ======================================== */}

        <div className="footer-heading">

          <div className="footer-kicker">
            <span className="footer-kicker-dot" />

            <span>
              Available for selected projects
            </span>
          </div>


          <h2 className="footer-title">
            LET&apos;S BUILD

            <br />

            <em>
              WHAT&apos;S NEXT.
            </em>
          </h2>


          <p className="footer-intro">
            Interfaces, experiences and
            products with a little more character.
          </p>

        </div>


        {/* ========================================
            MAIN
        ======================================== */}

        <div className="footer-main">

          {/* CONTACT */}
          <div className="footer-contact">

            <span className="footer-label">
              Let&apos;s talk
            </span>


            <a
              className="footer-call"
              href={PHONE_HREF}
              data-cursor="circle-white"
              data-sound="click"
              data-hoversound="hover"
              aria-label="Call me"
            >

              {/* Phone icon */}
              <span className="footer-call-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width="22"
                  height="22"
                >
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.24 1.01l-2.21 2.21z"
                    fill="currentColor"
                  />
                </svg>
              </span>


              {/* Label */}
              <span className="footer-call-copy">

                <span className="footer-call-live">
                  <span className="footer-call-live-dot" />
                  Available now
                </span>

                <strong>
                  Give me a call
                </strong>

              </span>


              {/* CTA pill */}
              <span className="footer-call-action">
                Tap to call
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  aria-hidden="true"
                  style={{ marginLeft: "5px" }}
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

            </a>



            {withSocial && (
              <div className="footer-social-row">

                <span
                  className={[
                    "footer-label",
                    "footer-label-social",
                  ].join(" ")}
                >
                  Find me online
                </span>

              </div>
            )}

          </div>


          {/* ACTIONS */}
          <div className="footer-actions">

            <div className="footer-action-group">

              <span className="footer-label">
                Explore
              </span>


              <div className="footer-links">

                <a
                  href="/privacy.html"
                  className="footer-link"
                  data-cursor="circle-white"
                  data-sound="click"
                  data-hoversound="hover"
                >
                  Privacy
                </a>


                <a
                  href="/legal.html"
                  className="footer-link"
                  data-cursor="circle-white"
                  data-sound="click"
                  data-hoversound="hover"
                >
                  Legal Notice
                </a>

              </div>

            </div>


            <div style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "flex-end" }}>
              <div
                className={[
                  "footer-back-to-top",
                  focused
                    ? "footer-back-to-top-focused"
                    : "",
                ].join(" ")}
                role="button"
                tabIndex={0}
                onClick={handleBackToTop}
                onKeyDown={handleBackKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                data-cursor="circle-white"
                data-sound="click"
              >

              <div className="footer-back-copy">

                <span>
                  Back to
                </span>

                <strong>
                  Top
                </strong>

              </div>


              <div className="footer-back-button">

                <svg
                  className="footer-back-to-top-icon"
                  viewBox="0 0 256 256"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M164 48L244 126.709M244 126.709L164 207M244 126.709H12"
                    stroke="var(--icon-color)"
                    strokeWidth="var(--stroke-lg)"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

            </div>

            <a
              href="/cv.html"
              className="footer-back-to-top"
              data-cursor="circle-white"
              data-sound="click"
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <div className="footer-back-copy">
                <span>View</span>
                <strong>My CV</strong>
              </div>
              <div className="footer-back-button">
                <svg
                  className="footer-back-to-top-icon"
                  viewBox="0 0 256 256"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ transform: "rotate(45deg)" }}
                >
                  <path
                    d="M164 48L244 126.709M244 126.709L164 207M244 126.709H12"
                    stroke="var(--icon-color)"
                    strokeWidth="var(--stroke-lg)"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
            
            </div>

          </div>

        </div>


        {/* ========================================
            BOTTOM
        ======================================== */}

        <div className="footer-bottom">

          <div className="footer-credits">

            {SHOW_ATTRIBUTION && (
              <div className="footer-credit">
                <span>
                  Designed &amp; built by
                </span>

                <strong>
                  Muhammad Hasan
                </strong>
              </div>
            )}


            <div className="footer-credit">

              <span>
                Music by
              </span>

              <a
                href="https://soundcloud.com/hmsurf"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="circle-white"
                data-hoversound="hover"
              >
                HM Surf
              </a>

            </div>

          </div>


          <p className="footer-copyright">

            © {new Date().getFullYear()}

            {" "}

            Muhammad Hasan

            <span>
              •
            </span>

            All rights reserved

          </p>

        </div>

      </div>
    </footer>
    </>
  );
}


export default Footer;