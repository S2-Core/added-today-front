"use client";

import { useEffect, useRef, useState } from "react";

interface IProps {
  value: number;
  duration?: number;
  formatter: (value: number) => string;
  shouldAnimate?: boolean;
}

const easeOutCubic = (progress: number): number =>
  1 - Math.pow(1 - progress, 3);

const AnimatedNumber = ({
  value,
  duration = 800,
  formatter,
  shouldAnimate = false,
}: IProps) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimatedRef.current) {
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    startTimeRef.current = null;

    if (!value) {
      setDisplayValue(0);
      hasAnimatedRef.current = true;
      return;
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = value * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      setDisplayValue(value);
      hasAnimatedRef.current = true;
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      startTimeRef.current = null;
    };
  }, [duration, shouldAnimate, value]);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayValue(0);
      hasAnimatedRef.current = false;
    }
  }, [shouldAnimate]);

  return <>{formatter(displayValue)}</>;
};

export default AnimatedNumber;
