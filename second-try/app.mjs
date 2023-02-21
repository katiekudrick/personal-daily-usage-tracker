const url = 'http://127.0.0.1:5000/';

// for api /get_item/<item_id> && /get_all_items endpoints
async function getRequest(url, query) {
  let queryString = "";

  for (let key in query) {
    if (queryString === "") {
      queryString += "?"
    } else {
      queryString += "&"
    }
    queryString += key + "=" + query[key]
  }

  const address = url + queryString;
  const options = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };

  let response = await fetch(address, options)
  let json = await response.json();

  console.log("For " + url + " Request at Query: " + JSON.stringify(query) + " Response Status: " + response.status)

  return json 
};


// https://gist.github.com/thegitfather/9c9f1a927cd57df14a59c268f118ce86


// hard data during build for /get_all_items GET
const test_get_items_in_category = {
  category: "Tops",
  index: 0,
  count: 10
};

// fetch get_all_items
async function getAllItems(items_request) {
  return await getRequest(url + "get_all_items", items_request);
};

// fetch get_item/
async function getItem(item_id) {
  return await getRequest(url + "get_item/", item_id);
};
// getItem("9abca33d-3100-447f-a425-d5ccedd5d737");
// console.log("getItem return: " + getItem("9abca33d-3100-447f-a425-d5ccedd5d737"));


// Used this documentation as guidance: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
async function generateAllItemsTable() {
  var items = await getAllItems(test_get_items_in_category);
  console.log(items);

  async function extract(items) {
    if (items.item_ids) {
      return extract(items.item_ids);
    } else {
      return items;
    }
  }
  var item_ids = await extract(items)
  console.log(item_ids);

  // async function extract(json) {
  // //  await JSON.parse(json, (key, value) => {
  // //   console.log("parsed key from " + json + ": " + key);
  // //   return value;
  // //  })
  // };

  // var item_ids = extract(items);
  // console.log("var item_ids = " + JSON.stringify(item_ids));

  var grabTable = document.getElementById("all-items-table");
  var grabTableBody = document.getElementById("rows-all-items");

  // creating all cells
  for (var i = 0; i < items.item_ids.length; i++) {
    // create <tr> html tags
    var createTableRows = document.createElement("tr");
    createTableRows.setAttribute("id", items.item_ids[i]);
    // generate cell text & insert
    for (var j = 0; j < 5; j++) {
      // create <td> html tags
      var createTableCell = document.createElement("td");
      // create text from json object by noding <td> contents
      var cellText = document.createTextNode(JSON.stringify(items.item_ids[i]));
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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestObject)
  };

  fetch(url, options)
    .then(response => {
      if (!response.ok) { throw response }
      return response.json()
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
  category: "Tops",
  name: "T-Shirt",
  description: "Black, Gap",
  cost: "20",
  purchase_date: "01-15-23"
};
// TODO: UNDO COMMENT BELOW
// addItem(add_item_good);