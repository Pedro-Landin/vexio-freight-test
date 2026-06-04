declare module 'vtex.product-context' {
  interface ProductContext {
    selectedItem?: {
      itemId: string
      sellers: Array<{ sellerId: string }>
    }
  }

  export function useProduct(): ProductContext
}

declare module 'vtex.order-manager/OrderForm' {
  interface OrderFormItem {
    id: string
    quantity: number
    seller: string
  }

  interface OrderForm {
    items: OrderFormItem[]
  }

  export function useOrderForm(): { orderForm: OrderForm }
}
