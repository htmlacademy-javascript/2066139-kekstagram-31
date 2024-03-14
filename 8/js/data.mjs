import {getRandomInteger, createRandomIdFromRange, getRandomArrayElement} from './util.mjs';

const GENERATED_POST_COUNT = 25;
const COMMENTS_IN_POST_MAX_COUNT = 30;
const AVATAR_COUNT = 6;
const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Виктор', 'Юлия', 'Робин', 'Питер', 'Мэри',];
const DESCRIPTIONS = [
  'Давайте наберем 100 лайков под этим фото!',
  'Бесконечное переплетение линий, создающее ощущение движения в статике.',
  'Пространство, заполненное плавными формами и переходами цветов, ведущее к гармонии и балансу.',
  'Симфония контрастов и оттенков, воплощенная в абстрактной композиции, которая захватывает дух.',
  'Гармоничное сочетание геометрических фигур и текстур, создающее визуальную интригу.',
  'Вихрь эмоций и настроений, запечатленный в абстрактном полотне, которое вызывает множество интерпретаций.',
  'Абстрактный образ, отражающий глубинные переживания и размышления автора, приглашающий к созерцанию и медитации.',
];
const MESSAGES_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generateCommentId = createRandomIdFromRange(1, GENERATED_POST_COUNT * COMMENTS_IN_POST_MAX_COUNT);

const createDataComment = () => ({
  commentsId: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES_COMMENT),
  name: getRandomArrayElement(NAMES),
});

const createUserPhoto = (index) => ({
  userId: index,
  urlPhoto: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_IN_POST_MAX_COUNT)}, createDataComment),
});

const generatedPosts = () => Array.from({length: GENERATED_POST_COUNT}, (_, postIndex) => createUserPhoto(++postIndex));

export {generatedPosts};
