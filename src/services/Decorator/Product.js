class Product {
    constructor(id, name, price, category, rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    getDetails() {
        return `Producto: ${this.name}, Precio: $${this.price.toFixed(2)}, Categoría: ${this.category}`;
    }
}

export default Product;