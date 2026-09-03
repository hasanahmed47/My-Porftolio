import ButtonRound from "./ButtonRound.jsx";
import Link from "./Link.jsx";

import Github from "./icons/Github.jsx";
import Linkedin from "./icons/Linkedin.jsx";
import Instagram from "./icons/Instagram.jsx";
import Mail from "./icons/Mail.jsx";
import Whatsapp from "./icons/Whatsapp.jsx";

import { social } from "../content/social";

import "./Social.css";

const icons = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  whatsapp: Whatsapp,
  instagram: Instagram,
};

function Social({
  variant,
}) {
  const getAriaLabel = (name) =>
    `Go to ${
      name.charAt(0).toUpperCase() +
      name.slice(1)
    }`;

  return (
    <div className="social">
      {social.map((item) => {
        const Icon =
          icons[item.name];

        if (!Icon) {
          return null;
        }

        return (
          <Link
            key={item.name}
            external
            href={item.url}
            aria-label={
              getAriaLabel(item.name)
            }
            className="social-link"
            data-cursor="circle-white"
          >
            <ButtonRound
              renderAs="div"
              variant={
                variant ?? "theme"
              }
              className="children-unclickable"
              data-hoversound="hover"
            >
              <Icon
                aria-label={
                  getAriaLabel(item.name)
                }
              />
            </ButtonRound>
          </Link>
        );
      })}
    </div>
  );
}

export default Social;