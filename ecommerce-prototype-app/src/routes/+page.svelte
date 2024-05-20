<script>
	import DealOfTheDaySection from './DealOfTheDaySection.svelte';
	import HeroSection from './HeroSection.svelte';
	import Gelocation from './Gelocation.svelte';
	import Camera from './Camera.svelte';
	import Haptics from './Haptics.svelte';
	import AddProduct from './AddProduct.svelte';
	import Toast from './Toast.svelte';
	import Notification from './Notification.svelte';
	import Share from './Share.svelte';
	import ActionSheet from './ActionSheet.svelte';
</script>

<HeroSection />
<DealOfTheDaySection />
<div class="pb-20 bg-green-300">
	<div class="container mx-auto">
		<div class="px-4 pt-16 md:px-20 max-w-screen-xl">
			<div class="mb-8 text-3xl font-bold md:text-4xl md:mb-4">Others</div>
			<div class="flex flex-col gap-4">
				<div class="md:flex md:flex-row md:gap-4 justify-between">
					<ActionSheet />
					<Notification />
					<Gelocation />
					<Camera />
					<Haptics />
				</div>
				<div class="md:flex md:flex-row md:gap-4 justify-between">
					<Toast />
					<Share />
					<AddProduct />
				</div>
			</div>
		</div>
	</div>
</div>
