#! /usr/bin/env node

// type in the command line: node populatedb <your mongodb url>

console.log(
    'This script populates. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Items = require('./models/items');


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
  //await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

//  importing created dbs
//  creating categories
async function categoryCreate(index, name) {
  const category = new Category({ name:name });
  await category.save();
  categories[index] = category;
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
    categoryCreate(5, "Candy Caramels"),
    categoryCreate(6, "Chocolate"),
    categoryCreate(7, "Soft Candy"),
  ])
}