export interface Sla {
  id: string
  friendlyName: string
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
