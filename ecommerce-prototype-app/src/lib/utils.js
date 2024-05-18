import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

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
		}
	}
};
