var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const projectIds = ["dropcoffee", "atmosx", "sharkie", "maintainiq", "pokedex"];
function simplifyModules(glob) {
  const result = {};
  for (const [path, mod] of Object.entries(glob)) {
    const match = path.match(/\/([a-z0-9_-]+)\.js$/i);
    if (match) result[match[1]] = mod;
  }
  return result;
}
__name(simplifyModules, "simplifyModules");
const projectModules = simplifyModules(import.meta.glob("./en/*.js", { eager: true }));
export {
  projectIds,
  projectModules
};
