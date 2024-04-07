import {DEBOUNCE_DELAY} from './consts.mjs';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRange = (min, max) => {
  const previousValues = [];

  return () => {
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    let currentValue = getRandomInteger(min, max);

    while(previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const getRandomArraysFromRange = (elements, count) => {
  const generateUniqueIndex = createRandomIdFromRange(0, elements.length - 1);
  return Array.from({length: count}, () => elements.at(generateUniqueIndex()));
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getNormalizedStringArray = (string) => string.toString().toLowerCase().trim().split(' ').filter(Boolean);

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  createRandomIdFromRange,
  getRandomArraysFromRange,
  isEscapeKey,
  getNormalizedStringArray,
  debounce,
};
