import { TouchEvent, useRef } from "react";

interface IProps {
  enabled: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  minSwipeDistance?: number;
  maxVerticalDrift?: number;
}

const useCalendarSwipe = ({
  enabled,
  onSwipeLeft,
  onSwipeRight,
  minSwipeDistance = 56,
  maxVerticalDrift = 48,
}: IProps) => {
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const resetTouchState = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!enabled) return;

    const firstTouch = event.touches[0];

    touchStartXRef.current = firstTouch.clientX;
    touchStartYRef.current = firstTouch.clientY;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!enabled) return;
    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    const changedTouch = event.changedTouches[0];
    const deltaX = changedTouch.clientX - touchStartXRef.current;
    const deltaY = changedTouch.clientY - touchStartYRef.current;

    const isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY);
    const isValidSwipe =
      isHorizontalGesture &&
      Math.abs(deltaX) >= minSwipeDistance &&
      Math.abs(deltaY) <= maxVerticalDrift;

    if (!isValidSwipe) {
      resetTouchState();
      return;
    }

    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }

    resetTouchState();
  };

  const onTouchCancel = () => {
    resetTouchState();
  };

  return {
    swipeHandlers: enabled
      ? {
          onTouchStart,
          onTouchEnd,
          onTouchCancel,
        }
      : {},
  };
};

export default useCalendarSwipe;
