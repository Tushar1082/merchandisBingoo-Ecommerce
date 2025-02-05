export const inc = "increment";
export const dec = "decrement";
export const setCount = "setCount";
export const remList = "remList";
export const load = "load";

export const incLike = "incrementLike";
export const decLike = "decrementLike";
export const setCountLike = "setCountLike";
export const remListLike = "remListLike";

export const incCart = "incrementCartTotalPrice";
export const incCartDis = "incrementCartDiscountTotalPrice";
export const decCart = "decrementCartTotalPrice";
export const decCartDis = "decrementCartDiscountTotalPrice";
export const setCartP = "setCartPrice";
export const setDisCartP = "setDisCartPrice";

export const disDelAdd = "displayDeliveryPage"
export const disOrder = "displayOrderPage";
export const disPayment = "displayPaymentPage";
export const selAdd = "selectAddress";
export const ordList = "orderList";
export const showPay = "showPayment";
export const emailId = "userEmailId";
export const total = "totalAmount";
export const hide = "hiddenPaymentNav";
export const rate = "productRating";

export function increment(value){
    return {type:inc,payload:value}
}
export function decrement(value){
    return {type:dec,payload:value}
}
export function Counting(value){
    return {type:setCount,payload:value}
}
export function removeList(value){
    return {type:remList,payload:value}
}
export function showLoader(value){
    return {type:load,payload:value}
}

export function incrementLike(value){
    return {type:incLike,payload:value}
}
export function decrementLike(value){
    return {type:decLike,payload:value}
}
export function CountingLike(value){
    return {type:setCountLike,payload:value}
}
export function remLikeList(value){
    return {type:remListLike,payload:value}
}

export function incCartPrice(value){
    return {type:incCart,payload:value}
}
export function incCartDisPrice(value){
    return {type:incCartDis,payload:value}
}
export function decCartPrice(value){
    return {type:decCart,payload:value}
}
export function decCartDisPrice(value){
    return {type:decCartDis,payload:value}
}
export function setCartPrice(value){
    return {type:setCartP,payload:value}
}
export function setDisCartPrice(value){
    return {type:setDisCartP,payload:value}
}

export function disDelAddPage(value){//displaydeliveryPage
    return {type:disDelAdd,payload:value}
}
export function disOrderPage(value){//displayOrderPage
    return {type:disOrder,payload:value}
}
export function disPaymentPage(value){
    return {type:disPayment,payload:value}
}
export function selectAddres(value){
    return {type:selAdd,payload:value}
}
export function orderList(value){
    return {type:ordList,payload:value}
}
export function showPayment(value){
    return {type:showPay,payload:value}
}
export function userEmailId(value){
    return {type:emailId, payload:value };
}
export function totalAmount(value){
    return {type:total,payload:value}
}
export function hidePaymentNav(value){
    return {type:hide,payload:value}
}
export function prodRating(value){
    return {type:rate,payload:value}
}