export class Obj{
    cart;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey  = localStorageKey;
        this.#loadFromStorage();
    }

        #loadFromStorage() {
            this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey));

            if (!this.cart) {
                this.cart = [{
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: 3
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: 2
                }]
            }
        }

        saveToStorage() {
            localStorage.setItem(
                this.#localStorageKey, JSON.stringify(this.cart))
        }

        addToCart(productId) {
            let matchingItem;

            this.cart.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            if (matchingItem) {
                matchingItem.quantity++;
            } else {
                this.cart.push(
                    {
                        productId: productId,
                        quantity: 1,
                        deliveryOptionId: 1
                    }
                )
            }

            this.saveToStorage()

        }

        removeFromCart(productId) {
            const newCart = [];

            this.cart.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            })

            this.cart = newCart;

            this.saveToStorage()
        }

        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;

            this.cart.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            if (!matchingItem) return;


            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage()
        }
}

export const cart = new Obj('cart');







