export const dashboardValueMotionProps = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: {
    duration: 0.32,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};
