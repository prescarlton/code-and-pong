const getPositionColor = (position: number) => {
  return position === 1
    ? "yellow-500"
    : position === 2
      ? "slate-300"
      : position === 3
        ? "amber-700"
        : "none"
}
export default getPositionColor
