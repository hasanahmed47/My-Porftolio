function List({
  title,
  items,
  size = "md",
}) {
  return (
    <div
      className={[
        "list",
        `list-size-${size}`,
      ].join(" ")}
    >
      {title && (
        <h3 className="list-title">
          {title}
        </h3>
      )}

      <ul className="list-items">
        {items?.map(
          (item) => (
            <li
              key={item}
              className="list-item"
              dangerouslySetInnerHTML={{
                __html: item,
              }}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default List;