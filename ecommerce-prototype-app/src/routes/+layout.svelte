<script>
	import { StatusBar } from '@capacitor/status-bar';
	import { Capacitor } from '@capacitor/core';
	import '../app.css';
	import utils, { products, cart } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	

	let dropdownUI = false;
	let cartUI = false;
	let name = '';
	let address = '';
	let phone = '';

	onMount(async () => {
		const productsFetched = await utils.products.all();
		products.set({
			loading: false,
			data: productsFetched
		});
	});
	if (Capacitor.isNativePlatform()) {
		StatusBar.setBackgroundColor({ color: '#166534' });
	}
	$: console.log($cart);
	$: cartItems = $cart;
	let orderUI = false;

	async function submitOrder() {
		try {
			let order = {
				products: cartItems,
				address: address,
				phone: phone,
				name: name
			};
			console.log('order', order);
			const orderSubmitted = await utils.orders.submitOrder(order);
			console.log('orderSubmitted', orderSubmitted);
			if (orderSubmitted) {
				orderUI = false;
				cartUI = false;
				dropdownUI = false;
				$cart = [];
				name = '';
				address = '';
				phone = '';
			}
			utils.others.showToast('Order Placed Successfully');
		} catch (error) {
			console.error('Failed to submit order:', error);
		}
	}
</script>

<body class={` selection:bg-green-950 selection:text-green-100 font-semibold  `}>
	<div class="fixed w-full">
		<nav class="bg-green-600">
			<div
				class="container flex gap-4 justify-between px-4 py-2 mx-auto md:justify-between md:items-center md:flex-row md:px-20 max-w-screen-2xl"
			>
				<a href="./" class="text-xl font-bold"> SUCCULENT STORE </a>
			</div>
		</nav>

		<nav class="bg-green-400 sticky top-0 z-20">
			<div class="container hidden sm:flex gap-4 px-4 py-2 mx-auto md:px-20 max-w-screen-2xl">
				<div class="flex flex-row justify-between w-full gap-3 md:gap-8 sm:gap-4">
					<div class="flex gap-3 md:gap-8 sm:gap-4">
						<div class=""><a href="/">Home</a></div>
						<div class=""><a href="/products">Products</a></div>
					</div>
					<div class="flex gap-3 md:gap-8 sm:gap-4">
						<div class=""><a href="/orders">Orders</a></div>
						<div class=""><a href="/auth">Auth</a></div>
					</div>
				</div>
			</div>
			<div class="container flex sm:hidden gap-4 px-4 py-2 mx-auto md:px-20 max-w-screen-2xl">
				<div class="flex flex-row justify-between w-full gap-3 md:gap-8 sm:gap-4">
					<div class=""><a href="/">Home</a></div>
					<div class=""><a href="/products">Products</a></div>
					<div class=""><a href="/auth">Auth</a></div>

					<div class=""><a href="/orders">Orders</a></div>
					<div class="relative">
						<button
							on:click={() => {
								dropdownUI = !dropdownUI;
								cartUI = true;
								if (orderUI) {
									orderUI = false;
								}
							}}>Cart</button
						>
						<div class="">
							{#if dropdownUI}
								<div
									class="absolute right-0 bg-green-900 w-[93vw] min-h-[80vh] max-h-[80vh] shadow-2xl md:mx-20 px-4 py-8 flex flex--col overflow-scroll"
									transition:fly={{
										duration: 300,
										y: 500,
										easing: quintOut
									}}
								>
									{#if cartUI}
										<div
											in:fly={{ y: 200, duration: 200 }}
											class="text-green-50 w-full flex flex-col justify-between"
										>
											<div class=" text-2xl">Cart</div>
											<div class="flex flex-col w-full justify-between h-full">
												{#if !cartItems.length}
													<div class="mt-20">
														<div>Your cart is empty</div>
														<div class="mt-2">
															<a class="text-2xl" href="./products"> Shop Products? </a>
														</div>
													</div>
												{:else}
													<div class="flex flex-col w-full">
														<div class=" overflow-y-scroll overscroll-contain w-full">
															{#each cartItems as item}
																<div
																	class="flex justify-between px-4 py-2 my-2 text-xl text-green-50 bg-green-700 w-full"
																>
																	<div class="font-normal">{item.product}</div>
																	<div class="">₹ {item.price}</div>
																</div>
															{/each}
														</div>
														<div class=" ">
															<div
																class="flex justify-between px-4 py-2 mt-8 text-2xl text-green-50 bg-green-950"
															>
																<div>Total</div>
																<div>
																	₹ {cartItems.reduce((acc, item) => acc + item.price, 0)}
																</div>
															</div>

															<button
																class="px-4 py-2 my-2 w-full text-xl bg-green-400 text-green-950 hover:bg-green-700 hover:text-green-50 active:bg-green-600 active:outline-none focus:outline-none focus:ring-2 focus:ring-green-600"
																on:click={() => {
																	cartUI = false;
																	orderUI = true;
																}}
															>
																Add Address
															</button>
														</div>
													</div>
												{/if}
											</div>
										</div>
									{/if}
									{#if orderUI}
										<div
											in:fly={{ y: 200, duration: 200 }}
											class="  overflow-y-scroll overscroll-contain font-medium w-full"
										>
											<div class=" text-green-50">
												<div class="text-2xl">Address</div>
												<form class="flex flex-col gap-2 px-4 pt-2 my-4 bg-green-700">
													<div class="flex flex-col">
														<label for="name" class="text-sm font-normal">Name</label>
														<input
															bind:value={name}
															placeholder="Full Name"
															class="px-4 py-2 mb-2 w-full text-md bg-green-100 border focus:outline-none focus:ring-2 focus:ring-green-800 text-green-950"
														/>
													</div>
													<div class="flex flex-col">
														<label for="address" class="text-sm font-normal">Address</label>
														<textarea
															bind:value={address}
															placeholder="Address"
															class="px-4 py-2 mb-2 w-full h-32 text-md bg-green-100 border focus:outline-none focus:ring-2 focus:ring-green-800 text-green-950"
														/>
													</div>
													<div class="flex flex-col">
														<label for="phone" class="text-sm font-normal">Phone</label>
														<input
															bind:value={phone}
															type="number"
															placeholder="+91 - XXX XXX XXXX"
															class="px-4 py-2 mb-2 w-full text-md bg-green-100 border focus:outline-none focus:ring-2 focus:ring-green-800 text-green-950"
														/>
													</div>
												</form>
												<button
													on:click={() => {
														orderUI = false;
														cartUI = true;
													}}
													class="py-2 mt-4 mb-2 w-full text-xl text-green-50 bg-green-950 hover:bg-green-700 hover:text-green-950 focus:outline-none focus:ring-2 focus:ring-green-600"
												>
													Back to Cart
												</button>
												<button
													on:click={() => {
														submitOrder();
													}}
													class="py-2 mt-2 mb-8 w-full text-xl bg-green-400 text-green-950 hover:bg-green-700 hover:text-green-50 active:bg-green-600 active:outline-none focus:outline-none focus:ring-2 focus:ring-green-600"
												>
													Order
												</button>
											</div>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</body>
<div class="pt-20">
	<slot />
</div>
