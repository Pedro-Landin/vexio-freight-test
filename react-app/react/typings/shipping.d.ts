export interface Sla {
  id: string
  name: string
  price: number
  shippingEstimate: string
}

export interface LogisticsInfo {
  slas: Sla[]
}

export interface SimulationResult {
  logisticsInfo: LogisticsInfo[]
}

export interface OrderFormItem {
  id: string
  quantity: number
  seller: string
}
