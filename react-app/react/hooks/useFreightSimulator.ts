import { useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { formatCep, isValidCep } from '../utils/utils'
import type { Sla, OrderFormItem, SimulationResult } from '../typings/shipping'

interface UseFreightSimulatorReturn {
  cep: string
  error: string
  loading: boolean
  slas: Sla[] | null
  handleCepChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSimulate: () => Promise<void>
  isValidCep: (value: string) => boolean
}

export function useFreightSimulator(): UseFreightSimulatorReturn {
  const [cep, setCep] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [slas, setSlas] = useState<Sla[] | null>(null)

  const productContext = useProduct()
  const { orderForm } = useOrderForm()

  const selectedItem = productContext?.selectedItem
  const sellerId = selectedItem?.sellers?.[0]?.sellerId ?? '1'


  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setCep(formatCep(e.target.value))
  }

  const handleSimulate = async () => {
    if (!isValidCep(cep)) {
      setError('CEP inválido. Use o formato 00000-000.')
      return
    }

    if (!selectedItem) {
      setError('Selecione um SKU antes de calcular o frete.')
      return
    }

    // pega os itens do carrinho
    const cartItems: OrderFormItem[] =
      orderForm?.items?.map((item: OrderFormItem) => ({
        id: item.id,
        quantity: item.quantity,
        seller: item.seller,
      })) ?? []

    // Adiciona o item selecionado ao carrinho , junto com as quantidades anteriores
    const allItems = [
      ...cartItems,
      {
        id: selectedItem.itemId,
        quantity: 1,
        seller: sellerId,
      },
    ]

    setLoading(true)
    setSlas(null)

    try {
      const response = await fetch(
        '/api/checkout/pub/orderForms/simulation?sc=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            items: allItems,
            postalCode: cep.replace('-', ''),
            country: 'BRA',
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`)
      }

      const data: SimulationResult = await response.json()

      // traz todos os SLAs sem repeti-los
      const allSlas =
        data.logisticsInfo
          ?.flatMap((info) => info.slas)
          .filter(
            (sla, index, self) =>
              self.findIndex((s) => s.id === sla.id) === index
          ) ?? []

      console.log('[Fretes Disponiveis]', allSlas)
      setSlas(allSlas)
    } catch (err) {
      console.error('[FreightSimulator]', err)
      setError('Erro ao calcular o frete. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return {
    cep,
    error,
    loading,
    slas,
    handleCepChange,
    handleSimulate,
    isValidCep,
  }
}
