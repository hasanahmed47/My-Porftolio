import videoAtmosx from "../../../assets/videos/atmosx.mp4";
import atmosx0 from "../../../assets/images/projects/atmosx/atmosx-0.webp";
import atmosx1 from "../../../assets/images/projects/atmosx/atmosx-1.webp";
import atmosx2 from "../../../assets/images/projects/atmosx/atmosx-2.webp";
import atmosx3 from "../../../assets/images/projects/atmosx/atmosx-3.webp";
import atmosx4 from "../../../assets/images/projects/atmosx/atmosx-4.webp";
var stdin_default = {
  title: "AtomsX",
  theme: "dark",
  tags: ["react", "javascript", "framer-motion", "Next-js"],
  live: "https://atmosx-js.vercel.app/",
  videoBorder: false,
  description: "AtmosX started because I got tired of weather apps that just throw numbers at you like a temperature, a percentage, done. Never really told you how the day feels.<br/><br/>So I built something that reacts to the weather itself panels that shift with rain, clouds, snow, or sun, temperature rendered in soft gradients, forecasts laid out hour by hour.<br/>",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoAtmosx,
        caption: "UI and functionality"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: atmosx0,
        alt: "Knot Shape",
        caption: "Temp"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: atmosx1,
        alt: "Donut Shape",
        caption: "Responsive Design"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: atmosx2,
        alt: "Sphere Shape",
        caption: "Weather Graph"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: atmosx3,
        alt: "Sphere Shape",
        caption: "pollution Info"
      }
    },
     {
      type: "media",
      props: {
        type: "image",
        src: atmosx4,
        alt: "Sphere Shape",
        caption: "Location"
      }
    }
  ]
};
export {
  stdin_default as default
};
