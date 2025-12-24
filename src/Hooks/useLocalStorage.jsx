import { useEffect, useState } from "react";

export default function useLocalStorage(curVal, key) {
  const [val, setVal] = useState(function () {
    const storedVal = localStorage.getItem(key);
    return storedVal ? JSON.parse(storedVal) : curVal;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(val));
    },
    [key, val]
  );

  return [val, setVal];
}
