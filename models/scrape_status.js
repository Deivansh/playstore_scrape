import mongoose from "mongoose";
const { Schema } = mongoose;

const scrapeStatusSchema = new Schema({
	status: { type: String },
});

const ScrapeStatus = mongoose.model("ScrapeStatus", scrapeStatusSchema);

export default ScrapeStatus;
