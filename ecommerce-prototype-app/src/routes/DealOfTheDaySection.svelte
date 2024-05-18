<script>
	import { onMount } from 'svelte';
	let countdown = 3600;

	onMount(() => {
		const timer = setInterval(() => {
			if (countdown > 0) {
				countdown--;
			}
		}, 1000);

		return () => clearInterval(timer); 
	});

	// Function to get formatted time string
	function getTimeString(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secondsDisplay = seconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsDisplay.toString().padStart(2, '0')}`;
	}

	$: formattedTime = getTimeString(countdown);
	// const filteredData = data.filter((product) => product.id <= 6);
</script>

<div class="pb-20 bg-green-700">
	<div class="container mx-auto">
		<div class="px-4 pt-16 text-green-50 md:px-20">
			<div class="mb-8 text-3xl font-bold md:text-4xl md:mb-4">Deals of the day</div>
			<div class="flex gap-4 justify-start mb-6 md:mb-14">
				<p class="text-lg font-normal text-green-300">Time Left</p>
				<p class="text-lg font-semibold text-green-50 md:w-fit">
					{formattedTime}
				</p>
			</div>
			<div class="overflow-x-scroll pb-2">
				<!-- <div class="flex gap-2 md:gap-6 w-fit">
              {filteredData.map((product) => (
                <div key={product} class="p-4 w-64 bg-green-600">
                  <div class="p-2 w-full bg-green-300 shadow-lg h-fit">
                    <img src={product.photo} />
                  </div>
                  <div class="p-2 mt-8 bg-green-300/20">
                    <p class="mb-1 text-xl font-normal text-green-50 whitespace-nowrap">
                      {product.product}
                    </p>
                    <div class="flex justify-between items-center">
                      <p class="text-sm font-normal">
                        <span class="text-green-900">Rs</span>{" "}
                        {product.price}
                      </p>
                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                        class="px-4 py-1 text-sm text-white bg-green-800 shadow-sm hover:bg-green-900 active:bg-green-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div> -->
			</div>
		</div>
	</div>
</div>
