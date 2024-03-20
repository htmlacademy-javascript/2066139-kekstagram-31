const imageUploadPreview = document.querySelector('.img-upload__preview img');
const controlScaleValue = document.querySelector('.scale__control--value');
const controlScaleSmaller = document.querySelector('.scale__control--smaller');
const controlScaleBigger = document.querySelector('.scale__control--bigger');

const ScaleOptions = {
  MIN_SCALE: 25,
  MAX_SCALE: 100,
  STEP_CHANGE: 25
};

const updateScale = (controlValue) => {
  controlScaleValue.value = `${controlValue}%`;
  imageUploadPreview.style.transform = `scale(${controlValue / 100})`;
};

const onControlScaleSmallerClick = () => {
  let controlValue = parseInt(controlScaleValue.value, 10);

  if (controlValue > ScaleOptions.MIN_SCALE) {
    controlValue -= ScaleOptions.STEP_CHANGE;
    updateScale(controlValue);
  }
};

const onControlScaleBiggerClick = () => {
  let controlValue = parseInt(controlScaleValue.value, 10);

  if (controlValue < ScaleOptions.MAX_SCALE) {
    controlValue += ScaleOptions.STEP_CHANGE;
    updateScale(controlValue);
  }
};

const imageEditingScaleInitialize = () => {
  controlScaleSmaller.addEventListener('click', onControlScaleSmallerClick);
  controlScaleBigger.addEventListener('click', onControlScaleBiggerClick);
};

const imageEditingScaleReset = () => {
  controlScaleValue.value = ScaleOptions.MAX_SCALE;
  imageUploadPreview.style.transform = null;
};

export {imageEditingScaleInitialize, imageEditingScaleReset};
