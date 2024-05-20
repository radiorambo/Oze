<script>
	import { onMount } from 'svelte';
	import { products, cart } from '$lib/utils.js';
	let countdown = 3600;
	$: productsList = $products.data;
	$: loading = $products.loading;
	onMount(() => {
		const timer = setInterval(() => {
			if (countdown > 0) {
				countdown--;
			}
		}, 1000);

		return () => clearInterval(timer);
	});

	function addToCart(product) {
		$cart = [...$cart, product];
		console.log($cart);
	}

	// Function to get formatted time string
	function getTimeString(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secondsDisplay = seconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsDisplay.toString().padStart(2, '0')}`;
	}

	$: formattedTime = getTimeString(countdown);
</script>

<div class="pb-10 bg-green-700">
	<div class="container mx-auto">
		<div class="px-4 pt-16 text-green-50 md:px-20">
			<div class="mb-8 text-3xl font-bold md:text-4xl md:mb-4">Deals of the day</div>
			<div class="flex gap-4 justify-start mb-6 md:mb-14">
				<p class="text-lg font-normal text-green-300">Time Left</p>
				<p class="text-lg font-semibold text-green-50 md:w-fit">
					{formattedTime}
				</p>
			</div>
			<div class="overflow-x-scroll pb-2 flex gap-2">
				{#if loading}
					<p>Loading...</p>
				{:else}
					{#each productsList as product}
						<div class=" bg-green-600 p-4">
							<div class="p-2 bg-green-300 shadow-lg">
								<img class="w-[208px] h-[250px]" src={product.photo} alt={product.product} />
							</div>
							<div class="p-2 mt-8 bg-green-300/20 w-48">
								<p class="mb-1 text-xl font-normal text-green-50 whitespace-nowrap">
									{product.product}
								</p>
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
		</div>
	</div>
</div>
