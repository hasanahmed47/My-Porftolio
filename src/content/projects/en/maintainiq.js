import videoMaintainiq from "../../../assets/videos/maintainiq.mp4";
import maintainiq0 from "../../../assets/images/projects/maintainiq/maintainiq-0.webp";
import maintainiq1 from "../../../assets/images/projects/maintainiq/maintainiq-1.webp";
import maintainiq2 from "../../../assets/images/projects/maintainiq/maintainiq-2.webp";
import maintainiq3 from "../../../assets/images/projects/maintainiq/maintainiq-3.webp";
import maintainiq4 from "../../../assets/images/projects/maintainiq/maintainiq-4.webp";
import maintainiq5 from "../../../assets/images/projects/maintainiq/maintainiq-5.webp";
var stdin_default = {
  title: "MaintainIQ",
  theme: "light",
  tags: ["HTML", "javascript", "react", "next", "mongodb"],
  videoBorder: true,
  live: "https://maintain-iq-u79p.vercel.app/login",
  description: "I built MaintainIQ to fix something that bugs me about how equipment gets maintained.Issues get reported verbally, forgotten, and rediscovered the hard way. Now every asset has a QR code and a real history: scan, report, and an AI layer triages the issue before a technician's even assigned.<br/><br/>Full role-based access for admins, supervisors, and technicians, with a live dashboard tracking everything in one place.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoMaintainiq,
        caption: "Tutorial"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: maintainiq0,
        alt: "Authentication",
        caption: "Authentication"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: maintainiq1,
        alt: "Admin Dashboard",
        caption: "Admin Dashboard"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: maintainiq2,
        alt: "Issues Page",
        caption: "Issues Page"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: maintainiq3,
        alt: "Asset Record",
        caption: "Asset Record"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: maintainiq4,
        alt: "Responsive Design",
        caption: "Responsive Design"
      }
    },
    {
      type: "media",
      props: {
        type: "image",
        src: maintainiq5,
        alt: "Technician",
        caption: "Technician"
      }
    }
  ]
};
export {
  stdin_default as default
};
