import SortStrategy from "./SortStrategy";

class SortByName extends SortStrategy {
    sort(products) {
        return products.sort((a, b) => a.name.localeCompare(b.name));
    }
}

export default SortByName;