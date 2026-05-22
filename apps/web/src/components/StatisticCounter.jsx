
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

export default function StatisticCounter({ value, label, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    damping: 40,
    stiffness: 100,
    mass: 1
  });
  
  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6">
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2 flex items-center justify-center">
        {prefix}
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </div>
      <div className="text-lg md:text-xl font-medium text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
