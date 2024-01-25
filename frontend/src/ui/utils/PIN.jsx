import { useRef } from 'react';

export default function PIN() {
  const inputRefs = Array.from({ length: 4 }, () => useRef(null));

  const handleInputChange = (index, value) => {
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="1"
          className="text-2xl border-2 border-black h-14 w-14 rounded-lg text-center"
          onChange={(e) => handleInputChange(index, e.target.value)}
          ref={ref}
        />
      ))}
    </div>
  );
}
