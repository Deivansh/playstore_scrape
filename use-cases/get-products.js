export default function makeGetProducts({ productsDb }) {
	return Object.freeze({
		getAllProducts,
		getProductByPackage,
	});

	async function getAllProducts() {
		const products = await productsDb.findAll();
		return products;
	}
	async function getProductByPackage(package_id) {
		const products = await productsDb.findByPackage(package_id);
		return products;
	}
}
