# FieldSync – Gerenciamento de Ordens de Serviço

Aplicativo mobile desenvolvido em **React Native com Expo**, com arquitetura **offline-first**, persistência local via **Realm** e gerenciamento de estado com **Zustand**.

O objetivo do app é permitir que ordens de serviço sejam visualizadas, criadas, editadas e removidas mesmo sem conexão com a internet, sincronizando automaticamente com a API quando a conexão é restabelecida.

---

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Realm
- Zustand
- Axios
- React Navigation

---

## Funcionalidades implementadas

- Listagem de ordens de serviço
- Visualização de detalhes da ordem
- Criação offline de ordens
- Edição offline de ordens
- Remoção offline com soft delete
- Persistência local com Realm
- Sincronização automática ao reconectar
- Sincronização manual via botão na tela inicial
- Controle visual de status de sincronização por item
- Tratamento básico de conflitos com base em `updatedAt`

---

## Estratégia offline-first

A aplicação utiliza o Realm como fonte principal de dados para a interface.

### Fluxo geral

1. A UI sempre consome os dados armazenados localmente.
2. Quando o usuário cria, edita ou remove uma ordem offline:
   - o registro é salvo no Realm;
   - a ordem é marcada como pendente de sincronização.
3. Quando a conexão é restabelecida:
   - as alterações locais pendentes são enviadas para a API;
   - em seguida, o app busca alterações remotas pela rota `/work-orders/sync`;
   - o banco local é atualizado;
   - a interface reflete o novo estado automaticamente.

---

## Controle de sincronização

Cada ordem possui metadados locais para controle do ciclo de sync:

- `dirty`
- `syncStatus`
- `pendingAction`

### Possíveis valores

#### `syncStatus`

- `synced`
- `pending`
- `error`

#### `pendingAction`

- `create`
- `update`
- `delete`

---

## Resolução de conflitos

O app aplica uma estratégia simples baseada em `updatedAt`:

- se um item remoto chegar e o item local não tiver alterações pendentes, o dado remoto sobrescreve o local;
- se o item local estiver pendente, a decisão considera a data de atualização mais recente;
- a estratégia foi mantida simples por se tratar de um teste técnico, priorizando clareza e previsibilidade.

---

## Estrutura do projeto

```bash
src/
  components/
  data/
    realm/
      schema/
  domain/
  hooks/
  services/
  stores/
  theme/
  ui/
    screens/
  utils/
```

Co## Como executar o projeto

### Pré-requisitos

Antes de rodar o projeto é necessário ter instalado:

- Node.js
- Yarn
- Android Studio
- Emulador Android configurado
- Ambiente React Native configurado

Para rodar no **iOS** também é necessário:

- macOS
- Xcode

---

### Instalação

Entre na pasta do projeto:

```bash
cd imeta-work-orders


Instale as dependências:

yarn

Rodar no Android:

yarn android

Rodar no iOS (somente macOS):

yarn ios

## Melhorias futuras

Possíveis evoluções do projeto:

- Adicionar toast/snackbar para feedback visual ao usuário
- Implementar React Hook Form + Yup para validação de formulários
- Criar testes automatizados para lógica de sincronização
- Implementar retry/backoff em falhas de rede
- Evoluir a estratégia de resolução de conflitos
```
