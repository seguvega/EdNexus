var CourseModel = require("../Models/course");

module.exports.create = async function (req, res, next) {

    try {

        console.log("body: " + req.body);
        
        let newItem = req.body;
        newItem.tags = req.body.tags.split(",").map(word => word.trim());
        newItem.owner = req.auth.id;

        let result = await CourseModel.create(newItem);

        res.json(result);

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await CourseModel.find().populate('owner');

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.inventoryByID = async function (req, res, next) {
    try {

        let inventory = await CourseModel.findOne({ _id: req.params.id })

        res.json(inventory);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.update = async function (req, res, next) {
    try {

        console.log("body: " + req.body);

        let updatedInventory = CourseModel(req.body);
        updatedInventory._id = req.params.id;

        let result = await CourseModel.updateOne({ _id: req.params.id }, updatedInventory);

        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Inventory updated successfully."
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Inventory not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        let result = await CourseModel.deleteOne({ _id: req.params.id });

        console.log(result);
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Inventory deleted successfully."
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Inventory not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.hasAuthorization = async function(req, res, next){

    try {
        let id = req.params.id
        let inventoryItem = await CourseModel.findById(id).populate('owner');
        console.log(inventoryItem);

        // If there is no item found.
        if (inventoryItem == null) {
            throw new Error('Item not found.') 
        }
        else if (inventoryItem.owner != null) { 

            if (inventoryItem.owner.id != req.auth.id) { 

                let currentUser = await UserModel.findOne({_id: req.auth.id}, 'admin');
  
                if(currentUser.admin != true){

                    console.log('====> Not authorized');
                    return res.status(403).json(
                        {
                            success: false,
                            message: 'User is not authorized to modify this item.'
                        }
                    );
                }
            }
        }
        next();
    } catch (error) {
        console.log(error);   
        next(error);
    }
}