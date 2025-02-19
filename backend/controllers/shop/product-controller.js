const Products = require('../../models/Product.js')

const getFilteredproduct = async (req, res) => {
    try {


        const {category=[],brand=[],sortBy ="price-lowtohigh"}=req.query
        
        let filters={};

        if(category.length){
            filters.category={$in: category.split(',')}
        }

        if(brand.length){
            filters.brand={$in: brand.split(',')}
        }

        let sort ={}

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.salePrice=1 
                break;
            case 'price-hightolow':
                sort.salePrice=-1
                break;
            case 'title-atoz':
                sort.title=1 
                break;
            case 'title-ztoa':
                sort.title=-1 
                break;
        
            default:
                sort.salePrice=1
                break;
        }

        const products = await Products.find(filters).sort(sort)

        res.status(200).json({
            success: true,
            data: products
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "error occured" + e
        })
    }
}


const getproductDetails = async(req,res)=>{
    try{
        const {id}= req.params;
        const product = await Products.findById(id);

        if(!product){
            return res.status(404).json({
                success:true,
                message:"product not found"
            })
        }

        res.status(200).json({
            success:true,
            data:product
        })

    }
    catch(e){

    }
}

module.exports = { getFilteredproduct ,getproductDetails};
