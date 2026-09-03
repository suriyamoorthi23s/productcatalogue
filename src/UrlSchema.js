export const catalogUrlSchema = {
    q: { default: "" },
    category: { default: "all" },
    minPrice: { default: "" },
    maxPrice: { default: "" },
    inStock: {
        default: false,
        parse: (v) => v === "1",
        serialize: (v) => (v ? "1" : "0"),
    },
    sortBy: { default: "" }, // "" | "price" | "rating"
    order: { default: "asc" }, // "asc" | "desc"
    page: { default: 1, parse: (v) => Number(v) || 1 },
};