import makeProductsDb from "./products-db.js";
import mongoose from "mongoose";
import Product from "../models/product.js";
import { url, dbName } from "../config/keys";

mongoose.connect(
	url,
	{
		dbName: dbName,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) console.error("DB connection error: " + err);
		else console.log("DB connected!");
	}
);

export async function makeDb() {
	const db = mongoose.connection;
	db.on("error", (err) => {
		console.error("DB connection error: " + err);
	});
	db.on("disconnect", () => {
		console.error("DB disconnected!");
	});
}

const productsDb = makeProductsDb({ Product });
export default productsDb;
