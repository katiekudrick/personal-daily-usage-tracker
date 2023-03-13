const url = 'http://127.0.0.1:5000/';

// call api /get_all_items endpoint
// !!query must be a json object!!
async function getAllItemsinCategory(query) {
  let queryString = "";

  for (let key in query) {
    if (queryString === "") {
      queryString += "?"
    } else {
      queryString += "&"
    }
    queryString += key + "=" + query[key]
  }

  const request = url + "get_all_items" + queryString;
  const options = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };

  let response = await fetch(request, options)
  let json = await response.json();

  console.log("Fetching: " + request + " || Response Status: " + response.status)

  return json 
};


// call api /get_item/ endpoint
// !!item_id must be a number string!!
async function getDetailedItem(item_id) {
  const request = url + "get_item/" + item_id;
  const options = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };

  let response = await fetch(request, options);
  let json = await response.json();

  console.log("getRequestString(" + request + ") returned json = " + JSON.stringify(json));
  console.log("Fetching: " + request + " || Response Status: " + response.status);
  return json 
};


// https://gist.github.com/thegitfather/9c9f1a927cd57df14a59c268f118ce86


// hard data during build for /get_all_items GET
const test_get_items_in_category = {
  category: "Tops",
  index: 0,
  count: 10
};


// Used this documentation as guidance: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
async function generateFetchedItemsTable() {
  // creates variable with json of fetched items per category request
  var items = await getAllItemsinCategory(test_get_items_in_category);
  console.log(items);

  // interacting with hard coded html tags
  var grabTable = document.getElementById("all-items-table");
  var grabTableBody = document.getElementById("rows-all-items");

  // creating table cells via javascript
  for (var i = 0; i < items.item_ids.length; i++) {
    // creates variable with json of details of each item_id in items
    var items_with_info = await getDetailedItem(items.item_ids[i]);
    console.log(items_with_info);

    // create <tr> html tags
    var createTableRows = document.createElement("tr");
    createTableRows.setAttribute("id", items.item_ids[i]);

    // match the item_id key in items_with_info to its corresponding <tr> id
    var matchKey = items_with_info.keyToMatch;

    // generate cell text & insert
    for (var key in items_with_info) {
      if (items_with_info.hasOwnProperty(key)) {
        // create <td> html tags
        var createTableCell = document.createElement("td");
        // create text from json object by noding <td> contents
        var cellText = document.createTextNode(items_with_info[key]);
        // insert <td> into <tr>
        createTableCell.appendChild(cellText);
        // insert <tr> into <tbody>
        createTableRows.appendChild(createTableCell);
      }
    }

    // find the <tr> element with the matching id & append the row to it
    var matchingRow = document.getElementById(matchKey);
    if (matchingRow) {
      matchingRow.appendChild(createTableRows);
    } else {
      // if no matching row is found, add the row to the emd of the table body
      grabTableBody.appendChild(createTableRows);
    }
  }
  // put the <tbody> in the <table>
  grabTable.appendChild(grabTableBody);
  // appends <table> into <body>
  document.body.appendChild(grabTable);
  grabTable.setAttribute("border", "2");
}
// for now, manipuate dom on page load
generateFetchedItemsTable();


// tutorial used for reference: https://www.w3schools.com/howto/howto_js_popup.asp
// pop-up /add_item screen (html modal boxes)
var pop_up = document.getElementById("add-item-screen");
var add_item_btn = document.getElementById("add-item-btn");
var span = document.getElementsByClassName("close-btn")[0];

// click add_item_btn, open pop-up screen
add_item_btn.onclick = function() {
  pop_up.style.display = "block";
}

// click (x) to close pop-up
span.onclick = function() {
  pop_up.style.display = "none";
}

// user clicks anywhere outside of the modal, closes pop-up screen
window.onclick = function(event) {
  if (event.target == pop_up) {
    pop_up.style.display = "none";
  }
}


// call api /get_categories endpoint
const category_dropdown = document.getElementById("table-dropdown");
const view_now_btn = document.getElementById("view-category");
const show_category = document.getElementById("displayed-category");

view_now_btn.addEventListener("click", function(event) {
  event.preventDefault();
  const select = category_dropdown.value;

  if (select == "all") {
    show_category.innerText = "Current Category View: All";
    getCategories();
  } else {
    show_category.innerText = `Current Category View: ${select.charAt(0).toUpperCase()}${select.slice(1)}`;
// PASS ARG HERE ONCE ADD MORE TO API
    getCategories();
  }
})

async function getCategories() {
  const request = url + "get_categories";
  const options = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  const select = category_dropdown.value;

  let response = await fetch(request, options);
  let json = await response.json();

  console.log("Fetching: " + request + " || Response Status: " + response.status);
  console.log("Category Select = " + select);
  console.log("Category JSON = " + JSON.stringify(json));
  return json 
};


// post api /add_item endpoint
const add_form = document.getElementById("form-add-item");
const add_category = document.querySelector("#add-item-cat");
const add_name = document.querySelector("#add-item-name");
const add_description = document.querySelector("#add-item-desc");
const add_cost = document.querySelector("#add-item-cost");
const add_date = document.querySelector("#add-item-date");

add_form.addEventListener("submit", async function(event){
  event.preventDefault();

  const newItem = {
    'category': add_category.value,
    'name': add_name.value,
    'description': add_description.value,
    'cost': add_cost.value,
    'purchase_date': add_date.value,
  }

  const response = await fetch('/add_item', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newItem)
  });

  const data = await response.json();
  console.log("Added New Item: " + data)
});

// !!!! HAVE NOT TESTED ADD NEW ITEM YET. NEED TO ADD HOW TO HANDLE FORM POST TO API


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