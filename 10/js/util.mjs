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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName.toString().trim());
  element.classList.add(className.toString().trim());
  element.textContent = text ? text : null;

  return element;
};

const getElementIndex = (el) => [...el.parentElement.children].indexOf(el);

const getNormalizedStringArray = (string) => string.toString().toLowerCase().trim().replace(/\s+/g, ' ').split(' ');

export {getRandomInteger, createRandomIdFromRange, getRandomArrayElement, isEscapeKey, createElement, getElementIndex, getNormalizedStringArray};
