from urllib.request import Request
from flask import Flask, request, jsonify, render_template, request


# Initialize Flask
app = Flask(__name__)

# Initialize the `items` list to store item data
items = []

# Render HTML Template


@app.route('/')
def display_items():
    return render_template('item-list.html', items=items)

# Define a route for the "add item" functionality


@app.route('/add-item', methods=['POST'])
def add_item():
    # Get values from form inputs
    item_name = request.form['item-name']
    item_description = request.form['item-description']
    item_type = request.form['item-type']
    item_cost = request.form['item-cost']
    item_quantity = request.form['item-quantity']

    # Calculate total cost
    total_cost = item_cost * item_quantity

    # Create an object to store the item data
    item = {
        'name': item_name,
        'description': item_description,
        'type': item_type,
        'cost': item_cost,
        'quantity': item_quantity,
        'totalCost': total_cost,
        'usage': 0,
        'costPerUse': 0,
    }

    # Add the item to the 'items' list
    items.append(item)

 # Render the HTML template and pass the updated `items` data to the client
    return render_template('item-list.html', items=items)

# Define a route for the "log usage" functionality


@app.route('/log-usage', methods=['POST'])
def log_usage():
    # Get the selected item name
    item_name = request.form['item-name']

    # Find the item in the array
    item = next(i for i in items if i['name'] == item_name)

    # Get the usage from the form input
    usage = request.form['item-usage']

    # Update the item's usage and cost per use
    item['usage'] += usage
    item['costPerUse'] = item['totalCost'] / item['usage']

    # Render the HTML template and pass the updated `items` data to the client
    return render_template('item-list.html', items=items)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)


# The client-side code is sending HTTP requests to the server using jQuery's $.ajax method. In a Flask app, you will need to use the requests library (or another HTTP client library) to send HTTP requests to the server.

# Set the API endpoint URL
url = 'http://localhost:5000/add-item'

# Set the form data
data = {
    'item-name': 'Item 1',
    'item-description': 'Description for Item 1',
    'item-type': 'Type 1',
    'item-cost': 10,
    'item-quantity': 5
}

# Send the POST request
response = Request.post(url, data=data)

# Print the response status code
print(response.status_code)

# Print the response content
print(response.content)
