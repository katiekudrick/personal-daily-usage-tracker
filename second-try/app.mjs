const url = 'http://127.0.0.1:5000/';



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

// call get all items to get the item id and list those
// and then for each item id in the list you can then get item.category, item.name, item.description, etc, etc...

// https://gist.github.com/thegitfather/9c9f1a927cd57df14a59c268f118ce86

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
const allItemsList = JSON.stringify(getAllItems(get_all_items));


// Used this documentation as guidance: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function generateAllItemsTable() {
  var grabTable = document.getElementById("all-items-table");
  var grabTableBody = document.getElementById("rows-all-items");

  // creating all cells
  for (let i = 0; i <= 100; i++) {
    // create <tr> html tags
    var createTableRows = document.createElement("tr");
    // generate cell text & insert
    for (let j = 0; j <= 5; j++) {
      // create <td> html tags
      var createTableCell = document.createElement("td");
      // create text from json object by noding <td> contents
      var cellText = document.createTextNode(allItemsList);
      // insert <td> into <tr>
      createTableCell.appendChild(cellText);
      // insert <tr> into <tbody>
      createTableRows.appendChild(createTableCell);
    }
    // add the row to the end of the table body
    grabTableBody.appendChild(createTableRows)
  }
  // put the <tbody> in the <table>
  grabTable.appendChild(grabTableBody);
  // appends <table> into <body>
  document.body.appendChild(grabTable);
  grabTable.setAttribute("border", "2");
}

generateAllItemsTable();






// Next Section to Work On:

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



// test case function for add_item endpoint
function addItem(item) {
    postRequest(url + "add_item", item);
};

// happy test case for /add_item test POST
let add_item_good = {
    category: "Sports Bras",
    name: "Longline Racerback Sports Bra",
    description: "Black, Old Navy, Medium Support",
    cost: "15",
    purchase_date: "12-30-22"
};
addItem(add_item_good);