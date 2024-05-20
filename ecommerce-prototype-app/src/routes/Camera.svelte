<script>
	import { Camera, CameraResultType } from '@capacitor/camera';
	let imageUrl;
	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri
		});
		imageUrl = image.webPath;
	};
</script>

<div class="flex w-full flex-col gap-4 justify-between mb-6 md:mb-14 bg-green-600 p-4">
	<p class="text-lg text-green-100 font-semibold">Camera</p>
	{#if imageUrl}
		<img class="max-w-80" src={imageUrl} alt="some" />
	{/if}
	<button
		class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
		on:click={takePicture}
	>
		pick photo
	</button>
</div>
