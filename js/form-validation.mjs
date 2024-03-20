import {getNormalizedStringArray} from './util.mjs';
import {MAX_LENGTH_COMMENT, MAX_HASHTAGS} from './consts.mjs';

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorMessage = {
  HASHTAG_COUNT: `Количество хэштегов не должно быть более ${MAX_HASHTAGS}`,
  DUPLICATE_HASHTAGS: 'Хэштеги не должны повторяться',
  MAX_LENGTH_COMMENTS: `Длина комментария не должна превышать ${MAX_LENGTH_COMMENT} символов`
};

const incorrectHashtagData = {
  invalid: [],
  duplicate: []
};

const validateHashtagSyntax = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = getNormalizedStringArray(value);
  incorrectHashtagData['invalid'].length = 0;

  hashtags.forEach((hashtag) => {
    if (!hashtagRegex.test(hashtag)) {
      incorrectHashtagData['invalid'].push(hashtag);
    }
  });

  return !incorrectHashtagData['invalid'].length;
};

const getErrorSyntaxMessage = () => (incorrectHashtagData['invalid'].length === 1)
  ? 'Введён невалидный хэштег'
  : 'Введены невалидные хэштеги';

const validateHashtagCount = (value) => {
  const hashtags = getNormalizedStringArray(value);
  return hashtags.length <= MAX_HASHTAGS;
};

const validateHashtagDuplicate = (value) => {
  const hashtags = getNormalizedStringArray(value);
  incorrectHashtagData['duplicate'].length = 0;
  const uniqueHashtags = new Set();

  hashtags.forEach((hashtag) => {
    const isDuplicateError = incorrectHashtagData['duplicate'].includes(hashtag);

    if (uniqueHashtags.has(hashtag) && !isDuplicateError) {
      incorrectHashtagData['duplicate'].push(hashtag);
    }

    uniqueHashtags.add(hashtag);
  });

  return !incorrectHashtagData['duplicate'].length;
};

const validateDescriptionLength = (value) => MAX_LENGTH_COMMENT >= value.length;

const configureFormValidation = (uploadForm, hashtagInput, descriptionInput) => {
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(hashtagInput, validateHashtagSyntax, getErrorSyntaxMessage);
  pristine.addValidator(hashtagInput, validateHashtagCount, ErrorMessage.HASHTAG_COUNT);
  pristine.addValidator(hashtagInput, validateHashtagDuplicate, ErrorMessage.DUPLICATE_HASHTAGS);
  pristine.addValidator(descriptionInput, validateDescriptionLength, ErrorMessage.MAX_LENGTH_COMMENTS);

  return {
    isValidForm: () => pristine.validate(), // Проверяем валидность формы
    resetValidate: () => pristine.reset(), // Сбрасываем валидацию
  };
};

export {configureFormValidation};
