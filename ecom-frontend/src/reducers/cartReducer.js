import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDetail: [],
};
export const CartSlicer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addAnItemToCart: (store, actions) => {
      let pre_cart = store.cartDetail;
      if (!pre_cart || pre_cart.length <= 0) {
        if (actions.payload.qty > 0) {
          store.cartDetail.push(actions.payload);
        }
      } else {
        let index = null;
        store.cartDetail.map((item, ind) => {
          if (item.product_id === actions.payload.product_id) {
            index = ind;
          }
        });

        if (index !== null) {
          let item = pre_cart[index];

          if (actions.payload.qty <= 0) {
            pre_cart.splice(index, 1);
          } else {
            item = { ...item, qty: Number(item.qty) + Number(actions.payload.qty) };

            pre_cart[index] = item;
          }
          store.cartDetail = pre_cart;
        } else {
          if (actions.payload.qty > 0) {
            pre_cart = [...pre_cart, actions.payload];
            store.cartDetail = pre_cart;
          }
        }
        console.log(index);
      }
      localStorage.setItem("myCart", JSON.stringify(store.cartDetail));
    },

    syncLocalCart: (state) => {
      let all_items = JSON.parse(localStorage.getItem("myCart")) || [];
      state.cartDetail = all_items;
    },
  },
});

export const { addAnItemToCart, syncLocalCart } = CartSlicer.actions;

export default CartSlicer.reducer;
