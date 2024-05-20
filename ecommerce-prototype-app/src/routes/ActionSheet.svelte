<script>
	import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

	const showActions = async () => {
		const result = await ActionSheet.showActions({
			title: 'Actions to Select',
			message: 'Select an option to perform',
			options: [
				{
					title: 'Option 1'
				},
				{
					title: 'Option 2'
				},
				{
					title: 'Close',
					style: ActionSheetButtonStyle.Destructive
				}
			]
		});

		console.log('Action Sheet result:', result);
	};
</script>

<div class="flex w-full flex-col gap-4 justify-between mb-6 md:mb-14 bg-green-600 p-4">
	<p class="text-lg text-green-100 font-semibold">Actions Sheet</p>
	<div class="flex flex-col gap-2">
		<button
			class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
			on:click={showActions}
		>
			Actions
		</button>
	</div>
</div>
