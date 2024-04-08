import {SLIDER_INITIAL_MIN, SLIDER_INITIAL_MAX, SLIDER_INITIAL_STEP} from './consts.mjs';

const EFFECT_CONFIG = {
  chrome: {
    style: 'grayscale', unit: '', sliderOptions: { min: 0, max: 1, step: 0.1 },
  },
  sepia: {
    style: 'sepia', unit: '', sliderOptions: { min: 0, max: 1, step: 0.1 },
  },
  marvin: {
    style: 'invert', unit: '%', sliderOptions: { min: 0, max: 100, step: 1 },
  },
  phobos: {
    style: 'blur', unit: 'px', sliderOptions: { min: 0, max: 3, step: 0.1 },
  },
  heat: {
    style: 'brightness', unit: '', sliderOptions: { min: 1, max: 3, step: 0.1 },
  }
};

const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const levelEffectsInput = effectSliderContainer.querySelector('.effect-level__value');
const effectSlider = effectSliderContainer.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imageUploadPreview = document.querySelector('.img-upload__preview > img');

let activeSlider;

// конфигурация для инициализации слайдера
const initialSliderOptions = {
  range: {
    min: SLIDER_INITIAL_MIN,
    max: SLIDER_INITIAL_MAX,
  },
  start: SLIDER_INITIAL_MAX,
  step: SLIDER_INITIAL_STEP,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
};

const resetEffect = () => {
  levelEffectsInput.value = 0;
  imageUploadPreview.style.filter = null;
  effectSliderContainer.classList.add('hidden');
};

const setEffect = ({style, unit, sliderOptions}) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: sliderOptions?.min,
      max: sliderOptions?.max,
    },
    start: sliderOptions?.max,
    step: sliderOptions?.step,
  });

  effectSlider.noUiSlider.on('update', () => {
    const saturationValue = effectSlider.noUiSlider.get();
    levelEffectsInput.value = saturationValue;
    imageUploadPreview.style.filter = `${style}(${saturationValue}${unit})`;
  });
};

const onEffectClick = (evt) => {
  if (evt.target.value === 'none') {
    resetEffect();
    return;
  }

  const effectInput = evt.target.closest('.effects__radio');
  effectSliderContainer.classList.remove('hidden');

  if (effectInput) {
    const effectValue = effectInput.value;
    setEffect(EFFECT_CONFIG[effectValue]);
  }
};

const initializeEffectSlider = () => {
  effectSliderContainer.classList.add('hidden');
  effectsList.addEventListener('click', onEffectClick);

  if (!activeSlider) {
    activeSlider = noUiSlider.create(effectSlider, initialSliderOptions);
  }
};

const destroyEffectSlider = () => {
  effectSlider.noUiSlider.destroy();
  activeSlider = null;
};

export {initializeEffectSlider, destroyEffectSlider, resetEffect};
