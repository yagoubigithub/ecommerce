const Category = require("../models/category")
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.categoryById = (req, res,next,id)=>{


    Category.findById(id).exec((err, category)=>{
        if(err || !category){
            res.status(400).json({
                error :  "Category Not found "
            })    
        }

        req.category = category;
        next();
    })
}
exports.create = (req, res)=>{

    const category = new Category(req.body);
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({
            data
        })
    })
}

exports.read = (req, res)=>{

    return res.json(req.category)
}
exports.update = (req, res)=>{

    const category = req.category;
    category.name = req.body.name;
    category.save((err, data)=>{
        if(err){
            return res.status(400).json(
                {
                    error : errorHandler(err)
                }
            )
        }

        res.json(data)
    })


}
exports.list = (req, res)=>{

   Category.find().exec((err, categories)=>{
       if(err){
        return res.status(400).json(
            {
                error : errorHandler(err)
            }
        )
       }

       res.json(categories)
   })
}

exports.remove = (req, res)=>{

   let category = req.category;
   category.remove((err, deletedCategory)=>{
       if(err){
           return res.status(400).json({
               error : errorHandler(err)
           })
       }

       res.json({
        message : "Category deleted successfully"
    })


   })
}