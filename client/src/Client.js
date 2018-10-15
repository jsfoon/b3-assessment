/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(`api/food?q=${query}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function list(query, cb) {
  let url = `http://localhost:3001/api/products`;
  if (typeof query === 'object') {
    url = new URL(url);
    console.log(url)
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]))
  }
  return fetch(url,{
    headers:{'content-type': 'application/json'},
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function show(id, cb) {
  let url = `http://localhost:3001/api/products/${id}`;
  return fetch(url,{
    headers:{'content-type': 'application/json'},
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function update(product, cb) {
  let url = `http://localhost:3001/api/products/${product.id}`;
  return fetch(url,{
    method: 'PUT',
    headers:{'content-type': 'application/json'},
    body: JSON.stringify(product)
  })
    .then(checkStatus)
    .then(cb);
}

function remove(id, cb) {
  let url = `http://localhost:3001/api/products/${id}`;
  return fetch(url,{
    method: 'DELETE',
    headers:{'content-type': 'application/json'},
  })
    .then(checkStatus)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search, list, show, update, remove };
export default Client;
