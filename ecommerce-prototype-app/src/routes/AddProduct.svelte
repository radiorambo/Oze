<script>
	import { Camera, CameraResultType } from '@capacitor/camera';

	import utils from '$lib/utils.js';
	let user = utils.user();
	import { goto } from '$app/navigation';

	let imageUrl;
	let imagePath;
	let productAddedSuccessful = false;
	let price;
	let name;
	let size;

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			resultType: CameraResultType.Uri
		});

		console.log('image', JSON.stringify(image));
		imageUrl = image.webPath;
		imagePath = image.path;
	};

	async function addProduct() {
		if (!$user) {
			goto('/auth');
			return;
		}

		let fileName, blob;

		// if (Capacitor.isNativePlatform()) {
		// 	const imageDirectory = Directory.Documents;
		// 	fileName = imagePath.split('/').pop(); // Extract filename from path
		// 	// Use the full file path for reading the image file
		// 	const contents = await Filesystem.readFile({
		// 		path: imagePath,
		// 		directory: imageDirectory,
		// 		encoding: Encoding.UTF8
		// 	});

		// 	console.log('fileUri', JSON.stringify(contents));

		// 	blob = new Blob([contents.data], { type: 'image/jpeg' });
		// 	console.log('blob', blob);
		// } else {

		// working in both web and android
		fileName = imageUrl.split('/').pop();
		blob = await utils.products.readFileFromUri(imageUrl);

		const { publicUrl } = await utils.products.uploadFile(fileName, blob);
		console.log('publicUrl', publicUrl);
		const product = {
			name: name,
			price: price,
			photo: publicUrl,
			size: document.getElementById('size').value
		};
		console.log('product', product);
		const { data, error } = await utils.products.addProduct(product);

		console.log(data, error);
		if (!error) {
			utils.others.showToast('Product added successfully');
			productAddedSuccessful = true;
			goto('/products');
		}
	}
</script>

<div class="flex w-full flex-col gap-4 justify-between mb-6 md:mb-14 bg-green-600 p-4">
	<p class="text-lg text-green-100 font-semibold">Add Product</p>
	<label for="name">Product Name</label>
	<input
		bind:value={name}
		class="px-4 py-2 mb-2 w-full text-md bg-green-100 border focus:outline-none focus:ring-2 focus:ring-green-800 text-green-950"
		id="name"
		type="text"
	/>
	<label for="price">Price</label>
	<input
		bind:value={price}
		class="px-4 py-2 mb-2 w-full text-md bg-green-100 border focus:outline-none focus:ring-2 focus:ring-green-800 text-green-950"
		id="price"
		type="number"
	/>
	<label for="size">Size</label>
	<select
		class="px-4 py-2 mb-2 w-full text-md bg-green-100 border focus:outline-none focus:ring-2 focus:ring-green-800 text-green-950"
		id="size"
	>
		<option value="small">Small</option>
		<option value="medium">Medium</option>
		<option value="big">Big</option>
	</select>
	<label for="photo">Photo</label>
	{#if imageUrl}
		<img class="max-w-80" src={imageUrl} alt="some" />
	{/if}
	<button
		class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
		on:click={takePicture}
	>
		Pick Photo
	</button>
	<button
		class="bg-green-500 hover:bg-green-800 active:bg-green-700 text-white font-bold py-2 px-4 rounded"
		on:click={addProduct}
	>
		Add Product
	</button>

	{#if productAddedSuccessful}
		<p class="text-green-100">Product Added Successfully</p>
		<a href="/products">View Products</a>
	{/if}
	{#if !$user}
		<p class="text-red-300">You are not logged in</p>
	
	{/if}
</div>
