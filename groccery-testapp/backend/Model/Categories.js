const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true } // Each item has a name
});
// Define the Day schema
const SbCategory = new Schema({
  day: { type: String, required: true }, // e.g., "Monday"
  items: { type: [ItemSchema], required: false } // Array of items for the day (e.g., ["Egg", "Bread"])
});

// Define the Category schema
const categorySchema = new Schema({
  name: { type: String, required: true }, // e.g., "Breakfast"
  itemsname: { type: [SbCategory], required: false } // Array of days for the category
});

// Create a model for Category using the categorySchema
const Category = mongoose.model('Category', categorySchema);

// Export the model
module.exports = Category;