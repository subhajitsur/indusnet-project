const express = require('express')
const mongoose = require('mongoose')
const Order = require('./orderhistry')
const product = require('./product');
const Category = require('./category');
const validator = require('validator');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost/shoppingcart-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
}).then(()=>{
    console.log("Connected.....");
}).catch(()=>{
    console.log("not connected...");
});


app.post('/categoryinsert',(req, res) =>{
    try {
        console.log("In CatInsert");
        console.log(Category);
        Category.collection.insertMany(req.body);
        res.status(201).send("Saved Data");
    } catch (e){
        res.status(400).send(e);
    }
});
/*app.get('/category/read', async (req, res) => {
    const category = new Category(req.body)
    try {
        const category = await Category.find({})
        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
})*/
/*app.post('/product'), async (req, res) => {
    const category = new  Product(req.body)

    try {
        let data=await Product.insertMany(data)
        await user.save(data)
        res.status(201).send("saved Data")
    } catch (e) {
        res.status(400).send(e)
    }
}*/

app.get('/api/category/read',async(req,res)=>
{
    try{
        console.log("hii")
        const data = await Category.find({})
        console.log(data)
        res.send(data)
    }catch(e){
        res.send(e)
    }
})

app.get('/api/categorywithproduct/read',async(req,res)=>
{
    try{
        
        const data = await Category.find({})
        .populate('product')
        .exec(function(err,result)
        {
            if(err)
            {
                res.send('error')
            }
            else{
                res.send(result)
            }
        })
       
        /*console.log(data)
        res.send(data)*/
    }catch(e){
        res.send(e)
    }
})
app.get('/api/expensiveproducts/read',async(req,res)=>
{
    try{
        
         const data =await Category.find({})
         //res.send(data)
        .populate('expensive')
        .exec(function(err,result)
        {
            if(err)
            {
                res.send("error")
            }
            else
            {
                res.send(result)
            }
        })
        
    } catch(e) {
        res.send(e)
    }
})

app.post('/api/product/insert',async(req,res)=>
{
    const post = await req.body
    try{
        const data = await product.insertMany(post)
        res.send("saved data")
    }catch(e){
        res.send(e)
    }
})

app.get('/api/productonly/read',async(req,res)=>
{
    try{
        
        const data = await product.find({})
                res.send(data)
       
        /*console.log(data)
        res.send(data)*/
    }catch(e){
        res.send(e)
    }
})
app.post('/api/order/insert',async(req,res)=>{  
    const post = await req.body
        try{
            const data = await Order.insertMany(post)
            res.send(data)
        }catch(e){
            res.send(e)
        }
    })
        app.get('/getorder',async(req,res)=>{
    
            try {
               const data= await Order.find()
                
                .populate({
                   path: 'productId',
                    populate:{
                        path: 'categoryId',
                    }
                })
                    
                //.populate({
                  //  path: 'productId',
                    //populate: {
                      //  path: 'categoryId',
                    
                        
                   // }
                //})
           
                .exec(function (err, response) {
                    err ? console.log(err) : res.status(200).send(response)
                })
            } catch (e) {
                res.status(400).send(e)
            }
        }) 

        app.get('/sevendaysorder/api',async(req,res)=>{
            const today = new Date();
            const result = await Order.find({
                createdAt: { $gte: today.getTime() - 1000 *60 * 60 * 24 * 3}
            }).populate({
                path: 'productId',
                populate: {
                    path: 'categoryId', 
                    options: { select: { name :1, id: 1 }}
                }
            })
            res.send(result);
        }); 

    app.post('/extensions',async(req,res)=>{
        const search = new RegExp(req.query.search, "i")
        console.log(search)
        try{
        const products= await product.find({name: search})
        res.send(products);
        } catch(e) {
            res.send(e)
        }
    })  
    
app.get('/shopping_cart123/pagination', async (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page), 
        limit: parseInt(req.query.limit)
    }
    if(pageOptions.page < 0 || pageOptions.page === 0)
     {
        result = {'status': 401,'message':'invalid page number,should start with 1'};
        return res.json(result);
     }
    
    Order.find().populate('productId').sort({'createdAt':-1})
        //.skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function (err, doc) {
            if(err) { res.status(500).json(err); return; };
            res.status(200).json(doc);
        });
    })
    app.post('/together',async(req,res)=>{
        let product = req.query.product;
    let priceFrom = req.query.priceFrom;
    let priceTo = req.query.priceTo;

            Product.find({
                where: {
                    name: {
                        in: product
                    },
                    price: {
                        $between: [min, max]
                    },
                    
                }
                
            }).then(products => {
                res.render('product', {products: products});
                console.log(products)
            });
    })  

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

