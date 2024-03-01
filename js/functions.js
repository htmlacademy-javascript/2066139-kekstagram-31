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

//task4: Делу — время
const parseTimeString = (timeString) => {
  const [hour, minute] = timeString
    .toString().split(':')
    .map(((item) => parseInt(item, 10)));

  return {hours: hour, minutes: minute};
};

const calculateAdjustedTime = (currentTime, minutesOffset) => {
  const adjustedHour = currentTime.hours + Math.floor((currentTime.minutes + minutesOffset) / 60);
  const adjustedMinute = (60 + currentTime.minutes + minutesOffset) % 60;

  return {hours: adjustedHour, minutes: adjustedMinute};
};

const isTimeLaterOrSame = (earlierTime, laterTime) => {
  if (laterTime.hours > earlierTime.hours) {
    return true;
  }

  if (laterTime.hours === earlierTime.hours && laterTime.minutes >= earlierTime.minutes) {
    return true;
  }

  return false;
};

const isMeetingInWorkingTime = (startTime, endTime, meetingStart, meetingDuration) => {
  const workStartTime = parseTimeString(startTime);
  const workEndTime = parseTimeString(endTime);
  const meetingStartTime = parseTimeString(meetingStart);
  const meetingEndTime = calculateAdjustedTime(meetingStartTime, meetingDuration);

  return (isTimeLaterOrSame(workStartTime, meetingStartTime) && isTimeLaterOrSame(meetingEndTime, workEndTime));
};

isMeetingInWorkingTime('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkingTime('8:0', '10:0', '8:0', 120); // true
isMeetingInWorkingTime('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkingTime('14:00', '17:30', '08:0', 90); // false
isMeetingInWorkingTime('8:00', '17:30', '08:00', 900); // false
