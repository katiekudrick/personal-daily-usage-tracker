//import fetch from 'node-fetch';
const url = 'http://127.0.0.1:5000/';

// import express from 'express';
// const app = express();
// app.get('/', function(req,res) {
//     res.send(browserRefresh('index.html'))
// });
  
// function browserRefresh(filePath) {
//     var html = fs.readFileSync(filePath);
//     var $ = cheerio.load(html);
//     $('body').append(`<script src="${process.env.BROWSER_REFRESH_URL}"></script>`)
//     return $.html();
// };

// for api add_item && /use_item endpoints
function postRequest(url, requestObject) {
  const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestObject)
  };

  fetch(url, options)
    .then(res => {
        if (!res.ok) { throw res }
        return res.json()
    })
    .then(json => console.log(json))
    .catch(error => console.error(error));
};

// for api /get_item/<item_id> && /get_all_items endpoints
function getRequest(url, query) {
  const options = {
    method: 'GET',
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  let queryString = "";

  for (let key in query) {
    if (queryString === "") {
      queryString += "?"
    } else {
      queryString += "&"
    }
    queryString += key + "=" + query[key]
  };

  fetch(url+queryString, options)
    .then(res => {
        console.log("Response status is " + res.status)

        if (!res.ok) {
            console.log("inside the !res.ok") 
            throw new Error("Something went wrong") 
        }
        console.log("gets to here")
        return res.json()
    })
    .then(json => console.log(JSON.stringify(json)))
    .catch(error => console.log(error));
};

// test case function for add_item endpoint
// function addItem(item) {
//     postRequest(url + "add_item", item);
// };

// // happy test case for /add_item test POST
// let add_item_good = {
//     category: "Sports Bras",
//     name: "Longline Racerback Sports Bra",
//     description: "Black, Old Navy, Medium Support",
//     cost: "15",
//     purchase_date: "12-30-22"
// };
// addItem(add_item_good);


// test case function for get_all_items endpoint
function getAllItems(query) {
    getRequest(url + "get_all_items", query);
};

// happy test case for /get_all_items GET
const get_all_items = {
    category: "Sports Bras",
    index: 0,
    count: 10
};
getAllItems(get_all_items);





// I know I need to use document.getElementById('get-all'), but where do I put it? part of getAllItems() or get_all_items_good? 

// const button = document.addEventListener.getElementById.forEach('get-all')
// const list = document.getElementById('all-items-list')

// button.click(() => {
//     const li_tag = document.createElement('li')
//     li_tag.textContent = item
//     list.appendChild(li_tag)
//   })

// function seeAll() {
//     const btn = document.addEventListener.getElementById('items').value
//     document.getElementById('all-items-list').innerHTML = btn
// }

