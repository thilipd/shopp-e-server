const Catagory = require('../models/catagory');
const Sub = require('../models/sub');
const slugify = require('slugify');
const Product = require('../models/product');


const catagoryControl = {

    create: async (req, res) => {
        try {

            const { name } = req.body;
            const catagory = await new Catagory({ name, slug: slugify(name) }).save()
            return res.json(catagory);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    list: async (req, res) => {
        try {

            const list = await Catagory.find().sort({ createdAt: -1 }).exec();
            return res.status(200).json(list)

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },

    read: async (req, res) => {
        try {
            const slug = req.params.slug;

            const catagory = await Catagory.findOne({ slug }).exec();

            const products = await Product.find({ catagory })
                .populate('catagory')
                .populate('createdAt', "_id name");
            return res.status(200).json({ catagory, products });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    update: async (req, res) => {



        try {
            const { name } = req.body;
            const slug = req.params.slug;

            const update = await Catagory.findOneAndUpdate({ slug: slug }, { name, slug: slugify(name) }, { new: true });
            return res.status(200).json({ msg: `${slug} catagory has been updated as ${name}` });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    delete: async (req, res) => {
        try {

            const slug = req.params.slug;

            await Catagory.findOneAndDelete({ slug: slug });

            res.status(200).json({ msg: `Succesfully deleted ${slug}` });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    getSubs: async (req, res) => {
        try {
            const id = req.params.id;

            const subs = await Sub.find({ parent: id });
            return res.status(200).json(subs);
        } catch (error) {
            return res.status(500).json({ msg: error.message });

        }
    },
}


module.exports = catagoryControl;