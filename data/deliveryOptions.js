export const deliveryOptions = [{
    id: 1,
    deliverDays: 7,
    price: 0
}, {
    id: 2,
    deliverDays: 3,
    price: 499
}, {
    id: 3,
    deliverDays: 1,
    price: 999
}];

export function getDeliveryoption(deliveryOptionId){
    
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    })

    return deliveryOption;

}       
