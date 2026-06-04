# 📦 Simulador de Frete — VTEX IO

Componente React desenvolvido em VTEX IO que exibe um input de CEP e, ao confirmar, consulta a API de simulação do Checkout da VTEX retornando as opções de frete disponíveis com nome, prazo e valor.

---

## 💻 Conceitos React utilizados

### Hooks

- `useState` para gerenciar os estados do componente: CEP digitado, erro, loading e resultado da simulação
- Hook customizado `useFreightSimulator` para isolar toda a lógica de estado e chamada à API, deixando o componente responsável apenas pela renderização

### Separação de responsabilidades

O componente foi dividido em camadas independentes:

- `typings/shipping.d.ts` — interfaces TypeScript
- `utils/utils.ts` — funções puras de formatação e validação (CEP, preço, estimativa)
- `hooks/useFreightSimulator.ts` — lógica de estado e integração com a API
- `freightsimulator/index.tsx` — apenas renderização chamando o hook

---

## 🌐 Integração com a plataforma VTEX

### `vtex.product-context`

Utilizado para obter o SKU selecionado na PDP via `useProduct`. Com isso o componente sempre simula o frete para o item que o usuário está visualizando, incluindo o `itemId` e o `sellerId` corretos no payload da simulação.

### `vtex.order-manager/OrderForm`

Utilizado para acessar os itens já presentes no carrinho via `useOrderForm`. A simulação considera tanto o SKU da PDP quanto os itens existentes no orderForm, refletindo o comportamento real do checkout da loja.

### API de simulação

A simulação é feita via `POST /api/checkout/pub/orderForms/simulation`, enviando os itens combinados e o CEP informado pelo usuário. O resultado retorna as opções de frete disponíveis com nome, prazo e preço.
