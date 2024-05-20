<script>
	import { Haptics, ImpactStyle } from '@capacitor/haptics';

	const hapticsImpactMedium = async () => {
		await Haptics.impact({ style: ImpactStyle.Medium });
	};

	const hapticsImpactLight = async () => {
		await Haptics.impact({ style: ImpactStyle.Light });
	};

	const hapticsVibrate = async () => {
		await Haptics.vibrate();
	};
</script>

<div class="flex w-full flex-col gap-4 justify-between mb-6 md:mb-14 bg-green-600 p-4">
	<p class="text-lg text-green-100 font-semibold">Haptics</p>
	<div class="flex flex-col gap-2">
		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
			on:click={hapticsVibrate}
		>
			High
		</button>

		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
			on:click={hapticsImpactMedium}
		>
			Medium
		</button>

		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
			on:click={hapticsImpactLight}
		>
			Light
		</button>
	</div>
</div>
