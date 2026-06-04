import React from 'react'
import { useFreightSimulator } from '../../hooks/useFreightSimulator'
import { formatPrice, formatEstimate } from '../../utils/utils'

function FreightSimulator() {
  // hook
  const { cep, error, loading, slas, handleCepChange, handleSimulate, isValidCep } =
    useFreightSimulator()

  return (
    <section>
      <h3>Calcular frete</h3>

      <div>
        <label htmlFor="cep-input">CEP</label>
        <input
          id="cep-input"
          type="text"
          inputMode="numeric"
          placeholder="00000-000"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
        />

        {error && <span>{error}</span>}

        <button
          onClick={handleSimulate}
          disabled={!isValidCep(cep) || loading}
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>

      <div>
        {loading && <p>Buscando opções de frete...</p>}

        {!loading && slas !== null && (
          slas.length > 0 ? (
            <ul>
              {slas.map((sla) => (
                <li key={sla.id}>
                  <span>{sla.friendlyName}</span>
                  <span>{formatEstimate(sla.shippingEstimate)}</span>
                  <span>{formatPrice(sla.price)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma opção de frete disponível para este CEP.</p>
          )
        )}
      </div>
    </section>
  )
}

export default FreightSimulator
