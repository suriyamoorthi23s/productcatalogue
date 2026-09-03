const BASE = "https://dummyjson.com";

export async function fetchProducts({ search, category, signal }) {
    let url;
    if (search) {
        url = `${BASE}/products/search?q=${encodeURIComponent(search)}&limit=0`;
    } else if (category && category !== "all") {
        url = `${BASE}/products/category/${encodeURIComponent(category)}?limit=0`;
    } else {
        url = `${BASE}/products?limit=0`;
    }

    const res = await fetch(url, { signal });
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }
    const data = await res.json();
    let products = data.products ?? [];

    if (search && category && category !== "all") {
        products = products.filter((p) => p.category === category);
    }

    return products;
}

export async function fetchCategories(signal) {
    const res = await fetch(`${BASE}/products/categories`, { signal });
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json(); // [{ slug, name, url }, ...]
}

export async function fetchProductById(id, signal) {
    const res = await fetch(`${BASE}/products/${id}`, { signal });
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json();
}


