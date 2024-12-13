class DiscountDecorator {
    constructor(product, discount) {
        this.product = product;
        this.discount = discount;
    }

    getDetails() {
        console.log(this.product);
        const discountedPrice = this.product.price - this.discount;
        return `Precio con descuento: $${discountedPrice.toFixed(2)}`;
    }
}

export default DiscountDecorator;