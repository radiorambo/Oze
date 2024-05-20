<script>
	import utils, { userSession } from '$lib/utils.js';

	let email;
	let password;
	let error;
	$: loggedInSuccessfully = $userSession;

	async function login(email, password) {
		const { data, error: loginError } = await utils.signInWithPassword(email, password);
		$userSession = data.session;
		error = loginError;
	}
</script>

<div class="px-2 bg-green-100 md:px-20">
	<div class="container mx-auto">
		<div class="flex flex-col justify-center items-center min-h-screen">
			<div class="p-6 w-full max-w-md bg-green-800 shadow-md">
				{#if loggedInSuccessfully}
					<div>
						<h2 class="text-3xl text-green-50">You are logged in</h2>
						<h2 class="mt-4 text-xl text-green-50">
							<a href="/products">Shop <span class=" underline">Products</span>?</a>
						</h2>
					</div>
				{:else}
					<div>
						<h2 class="mb-6 text-3xl text-green-50">Login</h2>
						<form>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-normal text-green-50" for="email">
									Username
								</label>
								<input
									class="px-3 py-2 w-full leading-tight rounded border appearance-none focus:outline-none focus:shadow-outline"
									type="email"
									placeholder="user@email.com"
									bind:value={email}
								/>
							</div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-normal text-green-50" for="password">
									Password
								</label>
								<input
									class="px-3 py-2 w-full leading-tight border appearance-none focus:outline-none focus:shadow-outline"
									type="password"
									placeholder="password"
									bind:value={password}
								/>
							</div>
							{#if error}
								<div class="text-red-300">Sign in failed. Try again</div>
							{/if}
							<button
								class="px-4 py-2 mt-4 font-bold bg-green-500 rounded text-green-950 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:shadow-outline"
								type="button"
								on:click={() => login(email, password)}
							>
								Sign In
							</button>
						</form>
					</div>
				{/if}
			</div>
			{#if loggedInSuccessfully}
				<div class="mt-4 p-2 bg-red-700">
					<button class="text-green-50"
						on:click={() => {
							utils.signOut();
						}}>LogOut</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
