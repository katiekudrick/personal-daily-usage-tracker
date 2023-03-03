#!/bin/bash

# test item #1
# "{\"category\": \"Sports Bras\", \"name\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Old Navy, Medium Support\", \"cost\": \"15\", \"purchase_date\": \"12-30-22\"}"

# test item #2
# {\"category\": \"Clothing\", \"name\": \"Black Hoodie, Cropped\", \"description\": \"Black, Old Navy\", \"cost\": \"25\", \"purchase_date\": \"12-30-22\"}

# test case for get_all_items
# "localhost:5000/get_all_items?category=clothes&index=0&count=10"

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Sports Bras\", \"name\": \"Longline Racerback Sports Bra\", \"description\": \"Black, Old Navy, Medium Support\", \"cost\": \"15\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Tops\", \"name\": \"Muscle Tank, Casual\", \"description\": \"Black, Target: A New Day\", \"cost\": \"6\", \"purchase_date\": \"03-01-23\"}" localhost:5000/add_item

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Tops\", \"name\": \"Muscle Tank, Casual\", \"description\": \"White, Target: A New Day\", \"cost\": \"6\", \"purchase_date\": \"03-01-23\"}" localhost:5000/add_item

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Tops\", \"name\": \"Muscle Tank, Casual\", \"description\": \"Tan, Target: A New Day\", \"cost\": \"6\", \"purchase_date\": \"03-01-23\"}" localhost:5000/add_item

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Bottoms\", \"name\": \"Leggings, Workout\", \"description\": \"Black, Compression, Target: All In Motion\", \"cost\": \"25\", \"purchase_date\": \"03-01-23\"}" localhost:5000/add_item

# /add_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Bottoms\", \"name\": \"Leggings, Workout\", \"description\": \"Black, Yoga, Nike\", \"cost\": \"50\", \"purchase_date\": \"12-13-21\"}" localhost:5000/add_item

# /use_item test POST
curl -H "Content-Type: application/json" -X POST -d "{\"item_id\": \"1b3bac75-738a-42ac-85c1-5207a3e7147b\", \"use_date\": \"01-17-23\"}" localhost:5000/use_item

# /get_all_items test GET
curl -D GET "localhost:5000/get_all_items?category=clothes&index=0&count=10"

# /get_item/<item_id> GET
curl -D GET "localhost:5000/get_item/1b3bac75-738a-42ac-85c1-5207a3e7147b"

# /get_all_categories test GET
curl -D GET "localhost:5000/get_all_categories"

# error test case for missing item_id for use_item
curl -H "Content-Type: application/json" -X POST -d "{\"use_date\": \"01-17-23\"}" localhost:5000/use_item

# error test case for missing use_date for use_item
curl -H "Content-Type: application/json" -X POST -d "{\"item_id\": \"1b3bac75-738a-42ac-85c1-5207a3e7147b\"}" localhost:5000/use_item

# error test case for missing category for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"name\": \"Black Hoodie, Cropped\", \"description\": \"Black, Old Navy\", \"cost\": \"25\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing name for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Clothing\", \"description\": \"Black, Old Navy\", \"cost\": \"25\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing description for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Clothing\", \"name\": \"Black Hoodie, Cropped\", \"cost\": \"25\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing cost for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Clothing\", \"name\": \"Black Hoodie, Cropped\", \"description\": \"Black, Old Navy\", \"purchase_date\": \"12-30-22\"}" localhost:5000/add_item

# error test case for missing purchase_date for add_item
curl -H "Content-Type: application/json" -X POST -d "{\"category\": \"Clothing\", \"name\": \"Black Hoodie, Cropped\", \"description\": \"Black, Old Navy\", \"cost\": \"25\"}" localhost:5000/add_item

# error test case for missing category and purchase_date for add_item 
curl -H "Content-Type: application/json" -X POST -d "{\"name\": \"Black Hoodie, Cropped\", \"description\": \"Black, Old Navy\", \"cost\": \"25\"}" localhost:5000/add_item

# error test case for non-existant item_id for /get_item/<item_id> 
curl -D GET "localhost:5000/get_item/80083"

# error test for /get_all_items, index passes letter
curl -D GET "localhost:5000/get_all_items?category=clothes&index=a&count=10"

# error test for /get_all_items, count passes letter
curl -D GET "localhost:5000/get_all_items?category=clothes&index=0&count=a"

# error test for /get_all_items, category missing
curl -D GET "localhost:5000/get_all_items?index=0&count=10"

# error test for /get_all_items, index missing
curl -D GET "localhost:5000/get_all_items?category=clothes&count=10"

# error test for /get_all_items, count missing
curl -D GET "localhost:5000/get_all_items?category=clothes&index=0"

# /get_all_categories test GET
curl -D GET "localhost:5000/get_all_categories"