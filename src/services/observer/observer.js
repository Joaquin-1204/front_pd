class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
        observer(this.getTotalItems());
    }


    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.amount, 0);
    }

    notify() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.amount, 0);
        this.observers.forEach(observer => observer(totalItems));
    }

    addToCart(product, amount) {
        const existingProduct = this.cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.amount += amount;
        } else {
            this.cart.push({ ...product, amount });
        }

        this.saveCart();
        this.notify();
    }

    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.notify();
    }
}
export const cartManager = new CartManager();