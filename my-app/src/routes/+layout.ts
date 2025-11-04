import type {LayoutLoad} from './$types';
import { fetchCategories } from '$lib/api/wp';

export const load: LayoutLoad  =  async () => {
    try {
        const categories = await fetchCategories();
        // console.log(categories)
        return { categories };
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        return { categories: [] , error: true};
    }
}