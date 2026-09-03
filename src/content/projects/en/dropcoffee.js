import videoDropcoffee from "../../../assets/videos/dropcoffee.mp4";
import dropcoffee0 from "../../../assets/images/projects/dropcoffee/dropcoffee-0.webp";
import dropcoffee1 from "../../../assets/images/projects/dropcoffee/dropcoffee-1.webp";
import dropcoffee2 from "../../../assets/images/projects/dropcoffee/dropcoffee-2.webp";
import dropcoffee3 from "../../../assets/images/projects/dropcoffee/dropcoffee-3.webp";
import dropcoffee4 from "../../../assets/images/projects/dropcoffee/dropcoffee-4.webp";
import dropcoffee5 from "../../../assets/images/projects/dropcoffee/dropcoffee-5.webp";
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
        src: videoDropcoffee,
        caption: "User Experience"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: dropcoffee0,
        alt: "Landing Page",
        caption: "Landing Page"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: dropcoffee1,
        alt: "product DESC",
        caption: "Product Description"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: dropcoffee2,
        alt: "Authentication",
        caption: "Authentication"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: dropcoffee3,
        alt: "Responsive Design",
        caption: "Responsive Design"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: dropcoffee4,
        alt: "Contact",
        caption: "Contact"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: dropcoffee5,
        alt: "Add to cart",
        caption: "Add to Cart"
      }
    }
  ]
};
export {
  stdin_default as default
};
