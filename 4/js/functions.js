// task1
const isStrLengthValid = (str, length) => length >= str.length;

isStrLengthValid('проверяемая строка', 20);
isStrLengthValid('проверяемая строка', 18);
isStrLengthValid('проверяемая строка', 10);

// task2
const isPalindrome = (str) => {

  if (typeof str !== 'string') {
    return false;
  }

  const normalizedString = str.replaceAll(' ','').toLowerCase();

  return normalizedString === normalizedString.split('').reverse().join('');
};

isPalindrome('Лёша на полке клопа нашёл ');

// task3
const extractNumber = (value) => {
  const valueStr = value.toString();
  let resultNumber = '';

  valueStr.split('').forEach((element) => {
    if (!Number.isNaN(parseInt(element, 10))) {
      resultNumber += element;
    }
  });

  return parseInt(resultNumber, 10);
};

extractNumber('ECMAScript 2022');
extractNumber('2023 год');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');
extractNumber(2023);
extractNumber(-1);
extractNumber(1.5);
