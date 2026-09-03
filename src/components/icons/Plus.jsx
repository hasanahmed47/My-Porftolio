function Plus({
  className = "",
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <path
        d="M128 0V256"
        stroke="var(--icon-color)"
        strokeWidth="var(--stroke-width, var(--stroke-md))"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d="M0 128L256 128"
        stroke="var(--icon-color)"
        strokeWidth="var(--stroke-width, var(--stroke-md))"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default Plus;