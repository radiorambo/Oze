<script>
	import { Share } from '@capacitor/share';

	const shareData = {
		title: 'Sample Text',
		text: 'This is a sample text',
		url: 'http://google.com/',
		dialogTitle: 'Share with buddies'
	};
	const shareTextOnly = {
		text: 'This is sample text'
	};

	const shareUrlOnly = {
		url: 'http://google.com/'
	};

	// Share with all available options
	const shareAllOptions = async () => {
		await Share.share(shareData);
	};

	// Share text only
	const shareTextOnlyOption = async () => {
		await Share.share(shareTextOnly);
	};

	// Share URL only
	const shareUrlOnlyOption = async () => {
		await Share.share(shareUrlOnly);
	};

	// Share local file using url parameter
	const shareLocalFile = async (photo) => {
		await Share.share({
			url: photo.path
		});
	};
</script>

<div class="flex w-full flex-col gap-4 justify-between mb-6 md:mb-14 bg-green-600 p-4">
	<p class="text-lg text-green-100 font-semibold">Share Sheet</p>
	<div class="flex flex-col gap-2">
		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
			on:click={shareAllOptions}
		>
			Share All Options
		</button>
		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
			on:click={shareTextOnlyOption}
		>
			Share Text Only
		</button>
		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
			on:click={shareUrlOnlyOption}
		>
			Share URL Only
		</button>
	</div>
</div>
