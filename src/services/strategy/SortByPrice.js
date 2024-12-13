import SortStrategy from "./SortStrategy";


class SortByPrice extends SortStrategy {
    sort(products) {
        return products.sort((a, b) => a.price - b.price);
    }
}

export default SortByPrice;