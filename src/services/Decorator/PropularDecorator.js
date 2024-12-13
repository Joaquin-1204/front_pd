class PopularDecorator {
    constructor(product) {
        this.product = product;
    }

    getDetails() {
        if (this.product.rating >= 4.5) {
            return `${this.product.getDetails()} (¡Popular!)`;
        }
        return this.product.getDetails();
    }
}


export default PopularDecorator;