export default function makeGetProducts({ getProductsUseCase }) {
	return async function getProduct(httpRequest) {
		const headers = {
			"Content-Type": "application/json",
		};
		try {
			if (httpRequest.params.package_id) {
				const package_id = httpRequest.params.package_id;
				var getProducts = await getProductsUseCase.getProductByPackage(
					package_id
				);
				return {
					headers,
					statusCode: 200,
					body: getProducts,
				};
			} else {
				var getProducts = await getProductsUseCase.getAllProducts();
				return {
					headers,
					statusCode: 200,
					body: getProducts,
				};
			}
		} catch (e) {
			console.log(`scrapeProduct Error: ${e}`);
			return {
				headers,
				statusCode: 400,
				body: {
					error: e.message,
				},
			};
		}
	};
}
