import videoCubeWar from "../../../assets/videos/cubewar.mp4";
import cubewar0 from "../../../assets/images/projects/cubewar/cubewar-0.webp";
import cubewar1 from "../../../assets/images/projects/cubewar/cubewar-1.webp";
import cubewar2 from "../../../assets/images/projects/cubewar/cubewar-2.webp";
import cubewar3 from "../../../assets/images/projects/cubewar/cubewar-3.webp";
import cubewar4 from "../../../assets/images/projects/cubewar/cubewar-4.webp";
import cubewar5 from "../../../assets/images/projects/cubewar/cubewar-5.webp";
var stdin_default = {
  title: "DROP Coffee",
  theme: "dark",
  tags: ["javascript", "node", "react", "mongoDB"],
  videoBorder: false,
  live: "https://drop-project-ebon.vercel.app",
  description: "DROP is a full-stack coffee ordering platform built for a modern, mobile-first café experience. I designed and built the entire stack myself.<br/><br/>Node/Express/MongoDB backend powering real-time order tracking.The platform includes a full admin dashboard with live analytics,and integrates local payment methods like JazzCash and Easypaisa to make it production-ready for the Pakistani market.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoCubeWar,
        caption: "Gameplay"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "Tutorial",
        caption: "Tutorial"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Maps Themes",
        caption: "Map Themes"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar2,
        alt: "Authentication",
        caption: "Authentication"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar3,
        alt: "Responsive Design",
        caption: "Responsive Design"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar4,
        alt: "Multiple Gamemodes",
        caption: "Multiple Gamemodes"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar5,
        alt: "Party System",
        caption: "Party System"
      }
    }
  ]
};
export {
  stdin_default as default
};
