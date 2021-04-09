export default function makeScrapeStatusDb({ ScrapeStatus }) {
	return Object.freeze({
		updateStatus,
		findStatus,
	});

	async function updateStatus(status) {
		const query1 = {};
		const query2 = { $set: { status } };
		const result = await ScrapeStatus.findOneAndUpdate(query1, query2, {
			upsert: true,
			new: true,
		}).lean();
		return result;
	}

	async function findStatus() {
		const query = {};
		const result = await ScrapeStatus.findOne(query);
		return result;
	}
}
