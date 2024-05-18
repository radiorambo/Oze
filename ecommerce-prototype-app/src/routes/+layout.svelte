<script>
	import '../app.css';
	import utils, { products } from '$lib/utils.js';
	import { onMount } from 'svelte';
	let user = utils.user();
	onMount(async () => {
		const productsFetched = await utils.products.all();
		products.set({
			loading: false,
			data: productsFetched
		});
	});
</script>

<body class={` selection:bg-green-950 selection:text-green-100 font-semibold  `}>
	<div class="">
		<nav class="bg-green-200">
			<div
				class="container flex gap-4 justify-between px-4 py-2 mx-auto md:justify-between md:items-center md:flex-row md:px-20"
			>
				<a href="./" class="text-xl font-bold"> SUCCULENT STORE </a>
				<div class="flex gap-3 justify-between md:gap-8 sm:gap-4">
					<div class="-mr-2">Orders</div>
					{#if $user}
						<button
							on:click={() => {
								utils.signOut();
							}}>LogOut</button
						>
					{:else}
						<a href="/auth">Login</a>
					{/if}
				</div>
			</div>
		</nav>
	</div>
</body>
<slot />
