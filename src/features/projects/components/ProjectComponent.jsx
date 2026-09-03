import ImageText from "./ImageText.jsx";
import Text from "./Text.jsx";
import List from "./List.jsx";
import Media from "./Media.jsx";


const components = {
  imageText: ImageText,
  text: Text,
  list: List,
  media: Media,
};


function ProjectComponent({
  type,
  props,
  index,
}) {
  const Component =
    components[type];

  if (!Component) {
    return null;
  }

  return (
    <Component
      {...props}
      index={index}
    />
  );
}

export default ProjectComponent;