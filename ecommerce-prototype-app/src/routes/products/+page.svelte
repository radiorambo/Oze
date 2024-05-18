<script>
	import { products, cart } from '$lib/utils.js';
	$: productsList = $products.data;
	$: loading = $products.loading;

	function addToCart(product) {
		$cart = [...$cart, product];
		console.log($cart);
	}
</script>

<div
	class="grid grid-cols-1 mt-4 gap-y-12 place-items-center px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:px-20"
>
	{#if loading}
		<p>Loading...</p>
	{:else}
		{#each productsList as product}
			<div class=" bg-green-600 p-4 w-[256px]">
				<div class="p-2 w-full bg-green-300 shadow-lg h-fit">
					<img class="w-[208px] h-[250px]" src={product.photo} alt={product.product} />
				</div>
				<div class="p-2 mt-8 bg-green-300/20">
					<p class="mb-1 text-xl font-normal text-green-50 whitespace-nowrap">{product.product}</p>
					<div class="flex justify-between items-center">
						<p class="text-sm font-normal">
							<span class="text-green-900">Rs {product.price}</span>
						</p>
						<button
							class="px-4 py-1 text-sm text-white bg-green-800 shadow-sm hover:bg-green-900 active:bg-green-800"
							on:click={() => {
								addToCart(product);
							}}
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
