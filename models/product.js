import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
	title: { type: String },
	image_src: { type: String },
	company_name: { type: String },
	app_genre: { type: String },
	screenshots: [],
	description: { type: String },
	createdOn: { type: Date, default: Date.now() },
	package_id: { type: String },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
