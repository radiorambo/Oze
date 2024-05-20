<script>
	import { onMount } from 'svelte';
	import utils from '$lib/utils.js';
	import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
	let user = utils.user();
	import { goto } from '$app/navigation';

	let orders = [];

	onMount(async () => {
		const { data, error } = await utils.orders.getOrders();
		if (data) {
			orders = data;
		}
		if (error) {
			console.error(error);
		}
	});

	let activeOrder = null;

	function toggleOrder(orderid) {
		activeOrder = activeOrder === orderid ? null : orderid;
	}
</script>

<div class="px-2 bg-green-100 md:px-20 min-h-screen">
	<div class="text-2xl text-start p-4">Orders</div>
	{#if !$user}
		<p class="text-red-600 p-4">You are not logged in</p>
	{:else}
		<div class="flex flex-col gap-4 p-4">
			{#each orders as order}
				<div class="bg-green-400 rounded-lg">
					<div
						class="px-6 py-4 flex justify-between items-center"
						on:click={() => toggleOrder(order.orderid)}
					>
						<div>
							<h2 class="text-lg font-semibold mb-2">Order ID: {order.orderid}</h2>
							<p class="text-gray-600">
								Created at: {new Intl.DateTimeFormat('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
									hour12: true
								}).format(new Date(order.created_at))}
							</p>
							<p class="text-gray-600">Address: {order.address}</p>
							<p class="text-gray-600">User ID: {order.userid}</p>
							<p class="text-gray-600">Phone: {order.phone}</p>
							<p class="text-gray-600">Name: {order.name}</p>
						</div>
						<div class="arrow {activeOrder === order.orderid ? 'active' : ''}">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
								<path d="M7 10l5 5 5-5z" />
							</svg>
						</div>
					</div>
					<div class="order-details {activeOrder === order.orderid ? 'active' : ''}">
						<div class="px-6 py-4 bg-green-300">
							<h3 class="text-lg font-semibold mb-2">Products:</h3>
							<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{#each order.products as product}
									<li class="bg-green-100 rounded-lg p-4">
										<img
											src={product.photo}
											alt={product.product}
											class="w-full h-40 object-cover rounded-lg mb-2"
										/>
										<h4 class="text-lg font-semibold">{product.product}</h4>
										<p class="text-gray-600">Size: {product.size}</p>
										<p class="text-gray-600">Price: ${product.price}</p>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.order-details {
		display: none;
	}
	.order-details.active {
		display: block;
	}
	.arrow {
		transition: transform 0.3s ease;
	}
	.arrow.active {
		transform: rotate(180deg);
	}
</style>
