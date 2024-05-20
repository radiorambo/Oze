<script>
	import { Toast } from '@capacitor/toast';

	const showHelloToast = async () => {
		await Toast.show({
			text: 'Hello! This is a toast'
		});
	};
</script>

<div class="flex w-full flex-col gap-4 justify-between mb-6 md:mb-14 bg-green-600 p-4">
	<p class="text-lg text-green-100 font-semibold">Toast</p>
	<div class="flex flex-col gap-2">
		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
			on:click={showHelloToast}
		>
			Toast
		</button>
	</div>
</div>
