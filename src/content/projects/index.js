const projectIds = ["dropcoffee", "atmosx", "sharkie", "maintainiq", "pokedex"];

function simplifyModules(glob) {
  const result = {};
  for (const [path, mod] of Object.entries(glob)) {
    const fileName = path.split("/").pop().replace(".js", "");
    result[fileName] = mod;
  }
  return result;
}

const rawModules = import.meta.glob("./en/*.js", { eager: true });
const projectModules = simplifyModules(rawModules);

export { projectIds, projectModules };