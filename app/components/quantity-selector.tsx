"use client";

type QuantitySelectorProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
};

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return <div className="quantity-selector" aria-label="Quantity selector">
    <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
    <output aria-live="polite">{value}</output>
    <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>＋</button>
  </div>;
}
