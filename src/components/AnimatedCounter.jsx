import { useState, useEffect } from 'react';

function AnimatedNumber({ target, suffix = '', decimals = 0, duration = 900 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    let frameId = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Плавное замедление в конце (easeOutCubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * Number(target);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(Number(target));
      }
    };

    frameId = requestAnimationFrame(step);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString('ru-RU');

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export default AnimatedNumber;