var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import gsap from "gsap";
import { BREAKPOINTS } from "../../utils/sizes";
const createMatchMedia = /* @__PURE__ */ __name((setup) => {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
      isLandscape: `(min-aspect-ratio: 1)`
    },
    (context) => {
      const { conditions } = context;
      const cleanup = setup(context, conditions);
      return cleanup;
    }
  );
  return mm;
}, "createMatchMedia");
export {
  createMatchMedia
};
