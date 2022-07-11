const Sub = require('../models/sub');
const slugify = require('slugify');


const SubControl = {

    create: async (req, res) => {
        try {

            const { name, parent } = req.body;
            const sub = await new Sub({ name, slug: slugify(name), parent }).save()
            return res.json(sub);

        } catch (error) {
            console.log()
            return res.status(500).json({ msg: error.message });
        }

    },
    list: async (req, res) => {
        try {

            const list = await Sub.find().sort({ createdAt: -1 }).exec();
            return res.status(200).json(list)

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },

    read: async (req, res) => {
        try {
            const slug = req.params.slug;

            const sub = await Sub.findOne({ slug });
            return res.status(200).json(sub);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    update: async (req, res) => {



        try {
            const { name, parent } = req.body;
            const slug = req.params.slug;

            const update = await Sub.findOneAndUpdate({ slug: slug }, { name, parent, slug: slugify(name) }, { new: true });
            return res.status(200).json({ msg: `${slug} Sub has been updated as ${name}` });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    delete: async (req, res) => {
        try {

            const slug = req.params.slug;

            await Sub.findOneAndDelete({ slug: slug });

            res.status(200).json({ msg: `Succesfully deleted ${slug}` });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
}


module.exports = SubControl;