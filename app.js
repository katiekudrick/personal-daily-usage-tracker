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
  // Get the selected item name
  const itemName = $("#item-name").val();

  // Find the item in the array
  const item = items.find((i) => i.name === itemName);

  // Get the usage from the form input
  const usage = $("#item-usage").val();

  // Update the item's usage and cost per use
  item.usage += usage;
  item.costPerUse = item.totalCost / item.usage;

  // Update the table row with the new data
  updateItemInTable(item);
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
