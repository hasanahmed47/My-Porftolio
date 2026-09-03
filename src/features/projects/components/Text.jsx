function Text({
  title,
  text,
}) {
  if (!title) {
    return (
      <p
        className="text"
        dangerouslySetInnerHTML={{
          __html: text ?? "",
        }}
      />
    );
  }

  return (
    <div
      className="
        text
        text-with-title
      "
    >
      <h3 className="text-title">
        {title}
      </h3>

      <p
        className="text-content"
        dangerouslySetInnerHTML={{
          __html: text ?? "",
        }}
      />
    </div>
  );
}

export default Text;