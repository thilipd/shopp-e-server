const Product = require('../models/product');
const slugify = require('slugify');

const productControl = {

    create: async (req, res) => {

        try {

            req.body.slug = slugify(req.body.title);
            const newProduct = await new Product(req.body).save();

            res.status(200).json({ msg: `${newProduct.title} product has been created` })

        } catch (error) {

            return res.status(400).json({ err: error });
        }

    },
    list: async (req, res) => {


        const count = parseInt(req.params.count)
        try {
            let products = await Product.find({})
                .limit(count)
                .populate({ path: 'catagory' })
                .populate({ path: 'sub' })
                .sort([['createdAt', 'desc']])
                .exec();

            res.status(200).json(products)

        } catch (error) {
            console.log(error)
            return res.status(400).json({ err: error });
        }

    },

    read: async (req, res) => {

        const slug = (req.params.slug)


        try {
            const read = await Product.find({ slug: slug })
                .populate('catagory')
                .populate('sub')
                .exec();

            res.status(200).json(read)

            console.log(read)

        } catch (error) {
            console.log(error)
            return res.status(400).json({ err: error });
        }

    },

    update: async (req, res) => {


        try {
            const { title } = req.body;

            if (title) {
                req.body.slug = slugify(title)
            }

            const update = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();


            return res.status(200).json({ msg: `${update.slug} Product has been updated as ${update.title}` });

        } catch (error) {

            console.log(error)
            return res.status(500).json({ msg: error.message });
        }

    },

    delete: async (req, res) => {

        const slug = (req.params.slug)
        try {
            const dlt = await Product.findOneAndDelete({ slug: slug }).exec();

            res.status(200).json(dlt)

        } catch (error) {
            console.log(error)
            return res.status(400).json({ err: error });
        }

    },

}

module.exports = productControl