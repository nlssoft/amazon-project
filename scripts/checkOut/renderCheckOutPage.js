import { cart, removeCartitem, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { fromatCurency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryoption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderCheckOutPage() {

    let cartSummaryHtml = '';


    // function for all carts ui
    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryoption(deliveryOptionId);

        const today = dayjs();
        let deliveryDate = today.add(deliveryOption.deliverDays, 'days');
        const stringDate = deliveryDate.format('dddd, MMMM D');


        cartSummaryHtml += `
        <div class="cart-item-container  
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${stringDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${fromatCurency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary 
                    js-delete-cart-item" 
                    data-delete-id= ${matchingProduct.id}>

                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                    ${deliveryOptionsHtml(matchingProduct, cartItem)}
                </div>
            </div>
            </div>
        `;

    });

    // function for deliveryDates
    function deliveryOptionsHtml(matchingProduct, cartItem) {
        const today = dayjs();
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {

            let deliveryDate = today.add(deliveryOption.deliverDays, 'days');
            const stringDate = deliveryDate.format('dddd, MMMM D');

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId

            const stringPrice = deliveryOption.price === 0
                ? 'FREE'
                : `${fromatCurency(deliveryOption.price)}`


            html += `
                <div class="delivery-option js-delivery-Option-date-update"
                data-product-id = ${matchingProduct.id}
                data-delivery-option-id = ${deliveryOption.id}>
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${stringDate}
                    </div>
                    <div class="delivery-option-price">
                        $${stringPrice} - Shipping
                    </div>
                    </div>
                </div>

                `
        })
        return html;
    }


    // cartSummary querySelector
    document.querySelector('.js-order-summary').
        innerHTML = cartSummaryHtml


    // delete button querySelector
    document.querySelectorAll('.js-delete-cart-item')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.deleteId;
                removeCartitem(productId);

                let container = document.querySelector(`.js-cart-item-container-${productId}`);
                if (container) {
                    container.remove();
                    renderPaymentSummary();}




            })

        })

    // delivery date option querySelector
    document.querySelectorAll('.js-delivery-Option-date-update').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, Number(deliveryOptionId))
            renderCheckOutPage();
            renderPaymentSummary();
        })
    })
}
