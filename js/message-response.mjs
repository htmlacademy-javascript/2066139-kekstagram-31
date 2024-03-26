const ALERT_SHOW_TIME = 5000;

const dataErrorMessageTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const getErrorMessage = () => {
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true);
  document.body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {getErrorMessage};
