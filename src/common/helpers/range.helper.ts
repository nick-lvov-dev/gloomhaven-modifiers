export const range = (end: number, start = 1) => {
  const r: number[] = [];
  for (let i = start; i <= end; i++) r.push(i);

  return r;
};
