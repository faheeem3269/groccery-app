import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListManagement from './ListManagement';
import axios from 'axios';

function Categorylist() {
  const { id } = useParams();
  const [listofproduct, setlistofproduct] = useState([]); // Used for storing products
  const [listofAllproduct, setlistofallproduct] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [titleproduct, settitleproduct] = useState('');
  const [openpanel, setopenpanel] = useState(false);
  const [editPanel, setEditPanel] = useState(false); // To handle edit panel
  const [currentSubcategory, setCurrentSubcategory] = useState(null); // Track current subcategory for editing

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:3001/getselectedcategory/${id}`);
        setlistofallproduct(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [id]);

  // Add a new product to the list
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const newCategoryObj = { name: newCategory.trim() };
      setlistofproduct([...listofproduct, newCategoryObj]);
      setNewCategory('');
    }
  };

  // Remove a product from the list
  const handleRemoveCategory = (index) => {
    const updatedCategories = listofproduct.filter((_, i) => i !== index);
    setlistofproduct(updatedCategories);
  };

  // Add Subcategory to category
  const handleAddSubcategory = async () => {
    const newSubcategory = {
      day: titleproduct,
      items: listofproduct.map(product => product.name), // Use the list of products as items
    };
    try {
      const response = await axios.post('http://127.0.0.1:3001/addsubcategory', { categoryId: id, subcategory: newSubcategory });
      setlistofallproduct(prevState => ({
        ...prevState,
        itemsname: [...prevState.itemsname, newSubcategory]
      }));
      setopenpanel(false); // Close panel after adding
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  // Edit Subcategory
  const handleEditSubcategory = async () => {
    const updatedSubcategory = {
      ...currentSubcategory,
      day: titleproduct, // Update day
      items: listofproduct.map(product => product.name), // Update items
    };
    try {
      const response = await axios.post('http://127.0.0.1:3001/updatesubcategory', { categoryId: id, subcategory: updatedSubcategory });
      const updatedItemsname = listofAllproduct.itemsname.map(item =>
        item._id === currentSubcategory._id ? updatedSubcategory : item
      );
      setlistofallproduct({ ...listofAllproduct, itemsname: updatedItemsname });
      setEditPanel(false); // Close edit panel after updating
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  // Remove Subcategory
  const handleRemoveSubcategory = async (subcategoryId) => {
    try {
      const response = await axios.post('http://127.0.0.1:3001/removesubcategory', { categoryId: id, subcategoryId });
      const filteredItems = listofAllproduct.itemsname.filter(subcategory => subcategory._id !== subcategoryId);
      setlistofallproduct({ ...listofAllproduct, itemsname: filteredItems });
    } catch (error) {
      console.error('Error removing subcategory:', error);
    }
  };

  return (
    <ListManagement>
      <div>
        <div className=' flex w-full justify-start px-6 py-7'>
          <button className='ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
           shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500' onClick={() => setopenpanel(true)}>
            Add Product
          </button>
        </div>
        
        {openpanel && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-xl w-full max-w-md'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-900'>Add List</h2>
                  <button className='text-gray-400 hover:text-gray-600' onClick={() => setopenpanel(false)}>Close</button>
                </div>
                <form onSubmit={handleAddSubcategory}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">List Title</label>
                    <input type="text" placeholder="Enter list title" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required onChange={(e) => settitleproduct(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Items</label>
                    <div className="flex gap-2 mb-2">
                      <input type="text" placeholder="Item name" className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" onChange={(e) => setNewCategory(e.target.value)} />
                      <button type="button" className="px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" onClick={handleAddCategory}>Add</button>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Create List</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Display Subcategories */}
        {listofAllproduct.itemsname && listofAllproduct.itemsname.length > 0 ? (
          <div>
            {listofAllproduct.itemsname.map((subcategory, index) => (
              <div className="flex-1 px-6 space-y-6" key={index}>
                <div className='bg-white rounded-lg shadow-sm border p-6'>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{subcategory.day}</h3>
                    <button className="focus:outline-none bg-red-50 p-2 rounded-lg hover:bg-red-100 hover:text-red-500 hover:border hover:border-red-300" onClick={() => handleRemoveSubcategory(subcategory._id)}>Remove</button>
                    <button className="focus:outline-none bg-blue-50 p-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 hover:border hover:border-blue-300" onClick={() => { setEditPanel(true); setCurrentSubcategory(subcategory); }}>Edit</button>
                  </div>
                  <ul>
                    {subcategory.items.map((item, idx) => (
                      <li key={idx} className='flex'>
                        <input type="radio" />
                        <p className='text-xl ml-3'>{item.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No subcategories available.</p>
        )}
      </div>
    </ListManagement>
  );
}

export default Categorylist;
