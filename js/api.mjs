const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const Route = {
  [Method.GET]: `${BASE_URL}/data`,
  [Method.POST]: BASE_URL,
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(route, { method, body });
  if (!response.ok) {
    throw new Error();
  }

  return response.json();
};

const getData = () => load(Route[Method.GET]);

const sendData = (body) => load(Route[Method.POST], Method.POST, body);

export {getData, sendData};
