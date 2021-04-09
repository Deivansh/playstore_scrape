export default function makeProductsDb({ Product }) {
	return Object.freeze({
		insertAll,
		findAll,
		findByPackage,
	});

	async function findAll() {
		const query1 = {};
		const query2 = { title: 1, image_src: 1, package_id: 1 };
		const result = await Product.find(query1, query2).lean();
		return result;
	}

	async function findByPackage(package_id) {
		const query = { package_id };
		const result = await Product.findOne(query).lean();
		return result;
	}

	async function findAllWithoutId() {
		const query1 = {};
		const query2 = { _id: 0 };
		const result = await Product.find(query1, query2).lean();
		return result;
	}

	async function insertAll(products) {
		let existing_products = await findAllWithoutId();
		if (!existing_products || existing_products.length <= 0) {
			const result = await Product.insertMany(products);
			return result;
		} else {
			products = products.map((value) => {
				let chosen_product = existing_products.find(
					(item) => item.title == value.title
				);
				if (chosen_product) {
					return { ...chosen_product, ...value };
				} else {
					return { ...value };
				}
			});
			await Product.deleteMany({});
			const result = await Product.insertMany(products);
			return result;
		}
	}
}
