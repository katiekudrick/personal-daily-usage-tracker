import fetch from 'node-fetch';
const url = 'http://localhost:5000/';

// fetch(url, options)


// for api add_item && /use_item endpoints
async function postRequest(url, requestObject) {
  const options = {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestObject)
  }

  await fetch(url, options)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error));
  
}

// for api /get_item/<item_id> && /get_all_items endpoints
async function getRequest(url, query) {
  const options = {
    method: 'GET'
  }

  let queryString = "";

  for (key in query) {
    if (queryString === "") {
      queryString += "?"
    } else {
      queryString += "&"
    }
    queryString += key + "=" + query[key]
  };

  await fetch(url + queryString, options)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error));

}


// test case function for add_item endpoint
function addItem(item) {
    postRequest(url + "add_item", item);
}

// happy test case for /add_item test POST
let add_item_good = {
    category: "Sports Bras",
    name: "Longline Racerback Sports Bra",
    description: "Black, Old Navy, Medium Support",
    cost: "15",
    purchase_date: "12-30-22"
}
addItem(add_item_good);


// test case function for get_all_items endpoint
function getAllItems(query) {
    getRequest(url + "get_all_items", query);
}

// happy test case for /get_all_items GET
const get_all_items = {
    category: "Sports Bras",
    index: 0,
    count: 10
}
getAllItems(get_all_items)


