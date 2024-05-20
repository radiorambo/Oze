import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Toast } from '@capacitor/toast';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export const products = writable({ loading: true, data: [] });
export const cart = writable([]);
export const user = writable();
export const supabaseClient = writable();
export const userSession = writable();

supabase.auth.getSession().then(({ data }) => {
	userSession.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userSession.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userSession.set(null);
	}
});

export default {
	user() {
		supabase.auth.getSession().then(({ data }) => {
			userSession.set(data.session);
		});
		return userSession;
	},
	signInWithPassword(email, password) {
		const data = supabase.auth.signInWithPassword({
			email,
			password
		});

		return data;
	},
	signIn(email) {
		return supabase.auth.signInWithOtp({ email });
	},
	signOut() {
		return supabase.auth.signOut();
	},
	products: {
		async all() {
			const { data } = await supabase.from('products').select();
			return data;
		},
		async uploadFile(productName, file) {
			const { data: uploadedDetails, error } = await supabase.storage
				.from('product_images')
				.upload(`public/${productName}`, file, {
					cacheControl: '3600',
					upsert: true
				});
			console.log(uploadedDetails);

			const { data: publicUrl } = supabase.storage
				.from('product_images')
				.getPublicUrl(uploadedDetails.path);
			console.log(publicUrl);
			return publicUrl;
		},
		async addProduct(product) {
			const { data, error } = await supabase.from('products').upsert({
				product: product.name,
				price: product.price,
				photo: product.photo,
				size: product.size,
				userUpload: true
			});
			return { data, error };
		},
		async readFileFromUri(uri) {
			return new Promise((resolve, reject) => {
				fetch(uri)
					.then((response) => response.blob())
					.then((blob) => resolve(blob))
					.catch((error) => reject(error));
			});
		}
	},
	orders: {
		async submitOrder(order) {
			const { data, error } = await supabase.from('orders').insert(order);
			return { data, error };
		},
		async getOrders() {
			const { data, error } = await supabase.from('orders').select();
			return { data, error };
		}
	},
	others: {
		async addLocalNotification(title, body, seconds) {
			if (Capacitor.isNativePlatform()) {
				const scheduledTime = new Date(Date.now() + 1000 * seconds);
				const notificationId = await LocalNotifications.schedule({
					notifications: [
						{
							title,
							body,
							id: 2,
							schedule: { at: scheduledTime }
						}
					]
				});

				console.log('Scheduled notification with id:', notificationId);
			} else {
				console.log('Web platform, no local notification support.');
			}
		},
		async showToast(message) {
			await Toast.show({
				text: message
			});
		},

		async showActions() {
			const result = await ActionSheet.showActions({
				title: 'Options',
				options: [
					{
						title: 'Reload'
					},
					{
						title: 'Close',
						style: ActionSheetButtonStyle.Destructive
					}
				]
			});

			return result;
		}
	}
};
