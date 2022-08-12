const distance = (x1,y1,x2,y2) => {
  return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1,2));
}

const force = (m1, m2, r) => {
  const G = 6.67e-11;
  return (G * m1 * m2) / Math.pow(r, 2);
}

export { distance, force };