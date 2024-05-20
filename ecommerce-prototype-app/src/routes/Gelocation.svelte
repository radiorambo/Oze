<script>
	import { Geolocation } from '@capacitor/geolocation';

	let coordinates = {};
	const printCurrentPosition = async () => {
		coordinates = await Geolocation.getCurrentPosition();
	};
</script>

<div class=" w-full flex flex-col gap-4 justify-between mb-6 md:mb-14 bg-green-600 p-4">
	<p class="text-lg text-green-100 font-semibold">Geolocation</p>
	<div>
		<p>Latitude: {coordinates?.coords?.latitude}</p>
		<p>Longitude: {coordinates?.coords?.longitude}</p>
		<p>Accuracy: {coordinates?.coords?.accuracy}</p>
	</div>
	<button
		on:click={printCurrentPosition}
		class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
	>
		Print Current Position
	</button>
</div>
