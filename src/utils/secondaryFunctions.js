export const roundNumber = val => Math.round(val * 100) / 100;

export const formatDate = stringDate => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const date = new Date(stringDate);
  return date.toLocaleDateString('ru', options);
};

export const generateRandomId = () =>
  Math.random().toString(36).substring(2, 8) +
  Date.now().toString().substring(9);

export const assignId = obj => ({ ...obj, id: generateRandomId() });

export const debounceRaw = fn => {
  let raf = 0;

  return (...args) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      fn(...args);
      raf = 0;
    });
  };
};


