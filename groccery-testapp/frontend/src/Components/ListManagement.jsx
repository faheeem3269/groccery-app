import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Categorylist from './categorylist';

function ListManagement({children}) {
  const [categories, setCategories] = useState([]); // Holds both name and id
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const newCategoryObj = { name: newCategory.trim() };
      setCategories([...categories, newCategoryObj]);
      setNewCategory('');
      setIsAddingCategory(false);
      saveCategoryToDb(newCategoryObj);
    }
  };

  const saveCategoryToDb = async (category) => {
    const cat=category;
    console.log(cat);
    
    await axios.post('http://127.0.0.1:3001/addcategory', {category });
    fetchCategories();
  };

  const removeCategoryFromDb = async (id) => {
  
    console.log(id);
    
    
    await axios.post(`http://127.0.0.1:3001/removecategory/${id}`);
    fetchCategories();
  };

  const handleRemoveCategory = (index) => {
    const categoryToRemove = categories[index];
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    const id=categoryToRemove._id
    console.log(id);
    
    removeCategoryFromDb(id);
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories only on mount

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3001/allcategory');
      const categoriesData = res.data.map((category) => ({
        name: category.name,
        _id: category._id
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  return (
    <div>
      <div className="flex">
        <nav className="fixed top-0 z-30 w-full pl-72 bg-white border-b shadow-sm">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="ml-2 text-xl font-bold text-gray-900">GrocerySave</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <p className="text-gray-700 mr-4">Welcome, Back</p>
                <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="h-screen sticky top-0 z-50 w-64 bg-white border-r shadow-sm">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              {!isAddingCategory && (
                <button className="p-1 hover:bg-emerald-50 rounded-full text-emerald-600" onClick={() => setIsAddingCategory(true)}>
                  Add
                </button>
              )}
            </div>

            {/* Display list of categories */}
            <div className="space-y-2">
              {categories.length === 0 ? (
                <p>No categories available. Add a new one!</p>
              ) : (
                categories.map((category, index) => (
                  <div key={category._id} className="flex items-center space-x-2">
                    <Link
                      to={`/categorylist/${category._id}`} // Use category._id here for proper routing
                      className="p-2 text-sm font-bold rounded flex-grow hover:text-emerald-500"
                    >
                      {category.name}
                    </Link>
                    <button
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                      onClick={() => handleRemoveCategory(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
              {/* Input for adding new category */}
              {isAddingCategory && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="p-2 border rounded flex-grow"
                    placeholder="Enter new category"
                    autoFocus
                  />
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700" onClick={handleAddCategory}>
                    Save
                  </button>
                  <button className="text-gray-600 hover:bg-gray-50 p-2 rounded" onClick={() => setIsAddingCategory(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-gray-50 w-full pt-16 mx-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ListManagement;
