const mongoose =require('mongoose');
const Category =require("../Model/Categories");
module.exports.AddNewCategory=async(req,res)=>{
    try {
        
        const {category}=req.body;
        console.log(category.name);
        const neategory=new Category({
         name:category.name,

        })
        
        await neategory.save();
        
        return res.json("Category added Successfully");
    
        
    } catch (error) {
        console.log(error.Message);
        return res.json({Message:error.Message});
    
    }
   

}
module.exports.RemoveCategory=async(req,res)=>{
    try {
        // Check if the ID is valid
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //   return res.status(400).json({ Message: "Invalid category ID" });
        // }
        
        const {id}=req.params;
       
        // Find and delete the category by its _id
        const deletedCategory = await Category.findByIdAndDelete(id);
    
        if (!deletedCategory) {
          return res.status(404).json({ Message: "Category not found" });
        }
    
        return res.json({ Message: "Category deleted successfully" });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ Message: error.message });
      }
}
module.exports.GetListOfCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: 1, _id: 1 });

        // You could also map to extract just the names if needed
       // const categoryNames = allCategories.map(cat => cat.name , cat._id);
       // console.log(allCategories);
        

        return res.json(allCategories);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports.GetUpdateOfCategories = async (req, res) => {
   
  try {
    
    const {id,titleproduct,listofproduct}=req.body;
    
    
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    // Create a new subcategory object
    const newSubcategory = {
      day: titleproduct,
      items: listofproduct
    };

    // Add the new subcategory to the category's subcategories array
    category.itemsname.push(newSubcategory);

    // Save the updated category
    await category.save();

    res.send({ message: 'Category updated successfully', updatedCategory: category });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating category', error });
  }
};
module.exports.GetSelectedCategories = async (req, res) => {
    try {
        const id=req.params.id;
        console.log(id);
        const allCategories = await Category.findById(id);

        // You could also map to extract just the names if needed
       // const categoryNames = allCategories.map(cat => cat.name , cat._id);
        console.log(allCategories);
        

        return res.json(allCategories);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};
