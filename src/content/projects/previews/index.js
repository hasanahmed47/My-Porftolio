// Lazy-load the "en" module only when needed
const previews = () => import("./en");

export { previews };