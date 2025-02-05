import {
    inc,
    dec,
    setCount,
    remList,
    load,
    incLike,
    decLike,
    setCountLike,
    remListLike,
    incCart,
    incCartDis,
    decCart,
    decCartDis,
    disDelAdd,
    disOrder,
    disPayment,
    selAdd,
    ordList,
    showPay,
    emailId,
    total,
    hide,
    setCartP,
    setDisCartP,
    rate
} from '../actions/actions.jsx';

export function cartReducer(state={count:0,list:[],remCartList:[],loading:false,cartDisPrice:0,cartPrice:0},action){
    switch (action.type) {
        case inc:
            return {...state,
                count:state.count+1,
                list:[...action.payload]
            }
        case dec:    
            return {...state,
                count:state.count-1,
                list:[...action.payload]
            }
        case setCount:
            return{...state,
                count:action.payload
            } 
        case remList:
            return{
                ...state,
                count:state.count,
                remCartList:[...action.payload]
            }    
        case load:{
            return {...state,
                loading:action.payload
            }
        }
        case incCart:{
            return{...state,
                cartPrice:state.cartPrice+action.payload
            }
        }
        case incCartDis:{
            return{...state,
                cartDisPrice:state.cartDisPrice+action.payload
            }
        } 
        case decCart:{
            return{...state,
                cartPrice:state.cartPrice-action.payload
            }
        }
        case decCartDis:{
            return{...state,
                cartDisPrice:state.cartDisPrice-action.payload
            }
        } 
        case setCartP:{
            return{...state,
                cartPrice:action.payload
            }
        }
        case setDisCartP:{
            return{...state,
                cartDisPrice:action.payload
            }
        }
        default:
            return state;
    }
}

export function likeReducer(state={likeCount:0,likeList:[],remLikeList:[],loading:false},action){
    switch (action.type) {
        case incLike:
            return {
                likeCount:state.likeCount+1,
                likeList:[...action.payload]
            }
            break;
        case decLike:    
            return {
                likeCount:state.likeCount-1,
                likeList:[...action.payload]
            }
            break;
        case setCountLike:
            return{
                likeCount:action.payload
            } 
            break;  
        case remListLike:
            return{
                likeCount:state.likeCount,
                remLikeList:[...action.payload]
            }    
            break;
        case load:{
            return {
                loading:action.payload
            }
        }    
        default:
            return state;
    }
}

export function paymentReducer(state={totalAmount:0,rating:0,dispAddress:true,dispOrder:false,dispPayment:false,showP:false,userEmail:'',hidden:false,selectedAdd:{},orderL:[]},action){
    switch(action.type)
    {
        case disDelAdd:
            return{
                ...state,
                dispAddress:action.payload
            }
        case disOrder:
            return{
                ...state,
                dispOrder:action.payload
            }
        case disPayment:
            return{
                ...state,
                dispPayment:action.payload
            }
        case selAdd:
            return{
                ...state,
                selectedAdd:{...action.payload} 
            }
        case showPay:
            return{
                ...state,
                showP:action.payload
            }    
        case ordList:
            return{
                ...state,
                orderL:[...action.payload]
            }
        case emailId:
            return{
                ...state,
                userEmail:action.payload
            } 
        case total:
            return{
                ...state,
                totalAmount:state.totalAmount+action.payload
            }  
        case hide:
            return{
                ...state,
                hidden: action.payload
            }    
        case rate:
            return{
                ...state,
                rating:action.payload
            }             
        default:
            return state    
    }
}