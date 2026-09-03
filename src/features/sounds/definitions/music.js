import { Howl } from "howler";
import trackLuci from "../../../assets/music/luci.ogg";
import trackAbout from "../../../assets/music/ambient-pads.ogg";
const musicTracks = {
  luci: new Howl({ src: [trackLuci], loop: true, volume: 0, preload: false }),
  about: new Howl({ src: [trackAbout], loop: true, volume: 0, preload: false })
};
const BASE_VOLUMES = {
  luci: 0.2,
  about: 0.3
};
export {
  BASE_VOLUMES,
  musicTracks
};
