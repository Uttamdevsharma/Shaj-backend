require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Product = require('../src/products/product.model'); // Adjust path if necessary

const updateProductCategories = async () => {
    try {
        await mongoose.connect(process.env.UB_URL);
        console.log('MongoDB connected successfully!');

        const oldToNewCategories = {
            'accessories': 'formal dress',
            'dress': 'casual dress',
            'jewellery': 'sports dress',
            'cosmetics': 'grooming'
        };

        const products = await Product.find({});
        let updatedCount = 0;

        for (const product of products) {
            const oldCategory = product.category;
            if (oldToNewCategories[oldCategory]) {
                product.category = oldToNewCategories[oldCategory];
                await product.save();
                updatedCount++;
                console.log(`Updated product ${product.name} from ${oldCategory} to ${product.category}`);
            }
        }

        console.log(`\nFinished updating categories. Total products updated: ${updatedCount}`);
    } catch (error) {
        console.error('Error updating product categories:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
};

updateProductCategories();
