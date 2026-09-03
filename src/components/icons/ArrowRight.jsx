function ArrowRight({
  className = "",
}) {
  return (
    <svg
      className={className}
      overflow="visible"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M87 18L197 126.41L87 237"
        stroke="var(--icon-color)"
        strokeWidth="var(--stroke-width, var(--stroke-lg))"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowRight;