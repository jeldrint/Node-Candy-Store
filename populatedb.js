#! /usr/bin/env node

// type in the command line: node populatedb <your mongodb url>

console.log(
    'This script populates. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Item = require('./models/items');


const categories = [];
const items = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?')
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

//  importing created dbs
//  creating categories
async function categoryCreate(index, name) {
  const categoryDetail = new Category({ name:name });
  await categoryDetail.save();
  categories[index] = categoryDetail;
  console.log(`Added Category: ${name}`)
}

async function createCategories() {
  console.log('creating categories');
  await Promise.all([
    categoryCreate(0, "Hard Candy"),
    categoryCreate(1, "Sour Candy"),
    categoryCreate(2, "Cotton Candy"),
    categoryCreate(3, "Lollipops"),
    categoryCreate(4, "Gummies"),
    categoryCreate(5, "Candy Caramels / Nougats"),
    categoryCreate(6, "Chocolate"),
    categoryCreate(7, "Soft Candy"),
    categoryCreate(8, "Chewing Gum")
  ])
}

//creating items
async function itemCreate(index, name, description, category, price, number_in_stock) {
  const itemDetail = {
    item_name: name,
    item_description: description,
    item_price: price,
    item_number_in_stock: number_in_stock,
  }

  if (category != false) itemDetail.item_category = category;

  const item = new Item(itemDetail)
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`)
}

async function createItems() {
  console.log('creating items')
  
  await Promise.all ([
    itemCreate(0,
      'Hershey Milk Chocolate',
      `The Hershey's Milk Chocolate Bar is a flagship chocolate bar manufactured by The Hershey Company. Hershey refers to it as "The Great American Chocolate Bar".`,
      categories[6],
      0.99,
      565,
    ),
    itemCreate(1,
      'Jelly Belly',
      `Jelly Belly Candy Company, formerly known as Herman Goelitz Candy Company and Goelitz Confectionery Company, is an American company that manufactures Jelly Belly jelly beans and other candy.`,
      categories[7],
      1.99,
      300,
    ),
    itemCreate(2,
      'Warheads',
      `Warheads is a brand of sour or tart candy manufactured by Impact Confections, located in Janesville, Wisconsin. They are marketed as an 'extreme' candy with an intense sour flavor.`,
      categories[1],
      2.49,
      150,
    ),
    itemCreate(3,
      'Abba-Zaba',
      `Abba-Zaba is a taffy candy bar with peanut butter center, made by the Annabelle Candy Company in Hayward, California.`,
      categories[5],
      0.49,
      1245,
    ),
    itemCreate(4,
      'Jolly Rancher',
      `Jolly Rancher is an American brand of sweet hard candy, gummies, jelly beans, lollipops, sour bites, and a line of soda put out by Elizabeth Beverage Company in 2004.`,
      categories[0],
      0.49,
      3245,
    ),
    itemCreate(5,
      'Gummi fish',
      `Gummy fish candy are a real catch! Great for sea-themed occasions, such as ocean-side engagement parties, weddings, anniversaries, nautical birthday parties and much more!`,
      categories[4],
      1.99,
      356,
    ),

  ])
}