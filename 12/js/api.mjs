const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const Route = {
  [Method.GET]: `${BASE_URL}/data`,
  [Method.POST]: BASE_URL,
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные',
  [Method.POST]: 'Не удалось отправить данные формы'
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(route, { method, body });
  return response.ok
    ? await response.json()
    : Promise.reject({ message: ErrorText[method], status: response.status });
};

const getData = async () => await load(Route[Method.GET]);

const sendData = async (body) => await load(Route[Method.POST], Method.POST, body);

export {getData, sendData};
