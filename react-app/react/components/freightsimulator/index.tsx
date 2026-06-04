import React from 'react'
import { useFreightSimulator } from '../../hooks/useFreightSimulator'
import { formatPrice, formatEstimate } from '../../utils/utils'
import styles from './styles.css'

function FreightSimulator() {
  // Hooks
  const { cep, error, loading, slas, handleCepChange, handleSimulate, isValidCep } =
    useFreightSimulator()

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        Calcular frete
      </h3>

      <div className={styles.form}>
        <label className={styles.label} htmlFor="cep-input">CEP:</label>

        <div className={styles.inputRow}>
          <input
            id="cep-input"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            type="text"
            inputMode="numeric"
            placeholder="00000-000"
            value={cep}
            onChange={handleCepChange}
            maxLength={9}
          />

          <button
            className={styles.button}
            onClick={handleSimulate}
            disabled={!isValidCep(cep) || loading}
          >
            {loading ? 'Calculando...' : 'Calcular'}
          </button>
        </div>

        {error && (
          <span className={styles.errorMessage}>{error}</span>
        )}
      </div>

      <div className={styles.results}>
        {loading && (
          <div className={styles.loadingWrapper}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <p className={styles.loadingText}>Buscando opções de frete...</p>
          </div>
        )}

        {!loading && slas !== null && (
          slas.length > 0 ? (
            <ul className={styles.slaList}>
              {slas.map((sla) => (
                <li key={sla.id} className={styles.slaItem}>
                  <span className={styles.slaName}>{sla.name}</span>
                  <span className={styles.slaEstimate}>{formatEstimate(sla.shippingEstimate)}</span>
                  <span className={styles.slaPrice}>
                    {formatPrice(sla.price)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>
              Nenhuma opção de frete disponível para este CEP.
            </p>
          )
        )}
      </div>
    </section>
  )
}

export default FreightSimulator
