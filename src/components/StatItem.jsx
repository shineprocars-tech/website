import { useState, useEffect } from 'react';

const useCounter = (target, start) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, 25);
    return () => clearInterval(timer);
  }, [start, target]);
  return count;
};

const StatItem = ({ value, label, visible, suffix = '' }) => {
  const count = useCounter(value, visible);
  const display =
    label === 'Rating (out of 50)' ? (count / 10).toFixed(1) : count.toLocaleString();
  return (
    <div className="text-center py-8">
      <p className="text-4xl md:text-5xl font-black mb-2">
        {display}
        {suffix}
      </p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default StatItem;