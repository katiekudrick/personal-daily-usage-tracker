import axios from 'axios';

// Array to store item data
const items = [];

// Add Item Form
function addItem() {
  // Get values from form inputs
  const itemName = $("#item-name").val();
  const itemDescription = $("#item-description").val();
  const itemType = $("#item-type").val();
  const itemCost = $("#item-cost").val();
  const itemQuantity = $("#item-quantity").val();

  // Calculate total cost
  const totalCost = itemCost * itemQuantity;

  // Create an object to store the item data
  const item = {
    name: itemName,
    description: itemDescription,
    type: itemType,
    cost: itemCost,
    quantity: itemQuantity,
    totalCost: totalCost,
    usage: 0,
    costPerUse: 0,
  };

  // Add the item to the array
  items.push(item);

  // Add the item to the select element in the Log Usage form
  const option = `<option value="${itemName}">${itemName}</option>`;
  $("#item-name").append(option);

  // Add the item to the table
  addItemToTable(item);
}

// Log Usage Form
function logUsage() {
  // Get the selected item name from the dropdown menu
  const itemName = document.getElementById("item-name").value;

  // Get the usage date and time from the form inputs
  const usageDate = document.getElementById("item-usage-date").value;
  const usageTime = document.getElementById("item-usage-time").value;

  // Combine the date and time into a single string
  const usageDateTime = `${usageDate} ${usageTime}`;

  // Record the usage in the database
  // You will need to implement this part yourself
  // depending on how you are storing the usage data
  recordUsage(itemName, usageDateTime);
}

// Add an item to the table
function addItemToTable(item) {
  const newRow = `<tr>
              <td>${item.name}</td>
              <td>${item.description}</td>
              <td>${item.type}</td>
              <td>${item.cost}</td>
              <td>${item.quantity}</td>
              <td>${item.totalCost}</td>
              <td>${item.usage}</td>
              <td>${item.costPerUse}</td>
            </tr>`;
  $("#item-list").append(newRow);
}

// Update an item in the table
function updateItemInTable(item) {
  const row = $(`#item-list tr:contains("${item.name}")`);
  row.html(`<td>${item.name}</td>
    <td>${item.description}</td>
    <td>${item.type}</td>
    <td>${item.cost}</td>
    <td>${item.quantity}</td>
    <td>${item.totalCost}</td>
    <td>${item.usage}</td>
    <td>${item.costPerUse}</td>`);
}

// Creating usage database
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "your-username",
  password: "your-password",
  database: "your-database",
});

function recordUsage(itemName, usageDateTime) {
  connection.query(
    "INSERT INTO usage (item_name, usage_date_time) VALUES (?, ?)",
    [itemName, usageDateTime],
    function (error, results, fields) {
      if (error) throw error;
    }
  );
}

// Connect to Python backend with HTTP request

// Request data from the '/data' route on the server
axios.get('http://localhost:3000/data')
  .then(response => {
    // Do something with the response data
  })
  .catch(error => {
    // Handle the error
  });

// Request data from the '/users' route with a query parameter
axios.get('http://localhost:3000/users?id=123')
  .then(response => {
    // Do something with the response data
  })
  .catch(error => {
    // Handle the error
  });

// Send a POST request with data to the '/users' route
axios.post('http://localhost:3000/users', {
  name: 'John',
  age: 30
})
  .then(response => {
    // Do something with the response data
  })
  .catch(error => {
    // Handle the error
  });

// handle the response data and any errors that might occur during the request:
// Request data from the '/data' route on the server
axios.get('http://localhost:3000/data')
  .then(response => {
    // Parse the response data
    const data = response.data;

    // Display the data on the page
    const output = document.getElementById('output');
    output.innerHTML = data;
  })
  .catch(error => {
    // Display an error message to the user
    const output = document.getElementById('output');
    output.innerHTML = 'An error occurred';
  });
