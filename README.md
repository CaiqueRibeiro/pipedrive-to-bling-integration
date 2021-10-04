# Integração Pipedrive - Bling

Integração que realiza o envio das oportunidades dadas como Ganhas no Pipedrive e inseri-las como pedidos no sistema Bling.


## Requisitos
```
● Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

● Criar banco de dados mongoDB.

● Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

● Criar endpoint para trazer os dados consolidados da collection do MongoDB.
```

# Executando o projeto
## 1. Instalação de dependências
```
yarn
```

## 2. Configure o arquivo .env com as urls e chaves de acesso
```
MONGO_URL=

PIPEDRIVE_API_KEY=
PIPEDRIVE_API_URL=

BLING_API_KEY=
BLING_API_URL=
```

## 3. Configure o arquivo do typeORM (ormconfig.json)

### 3.1 Caso esteja executando o mongoDB localmente, use o seguinte formato de configuração:
```
[
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "NOME_DA_DATABASE",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
```
### 3.2 Caso esteja usando o MongoDB Atlas, use o seguinte formato de configuração:
```
[
  {
    "name": "mongo",
    "type": "mongodb",
    "url": "SUA URL DE CONEXAO DO ATLAS",
    "useNewUrlParser": true,
    "useFindAndModify": false,
    "useUnifiedTopology": true,
    "useCreateIndex": true, 
    "ssl": true,
    "authSource": "admin",
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
```
OBS: A collection usada no projeto se chama opportunities

## 4.1 Executando em modo de desenvolvimento:
```
yarn dev:server
``` 
## 4.1 Criando build do projeto + executando:
```
yarn build
yarn start
``` 
## 4.1 Executando teste:
```
yarn test
``` 

# Rotas
## Integração (GET)
Realiza a integração entre os sistemas e insere os valores de venda por dia no MongoDB
``` 
http://localhost:3333/opportunities/integrate
```

OBS: A integração é executada automaticamente por uma tarefa agendada a cada 1 hora. A rota foi criada para facilitar a avaliação do resultado.

## Vendas por dia (MongoDB) (GET)
Retorna JSON com a lista das vendas por dia.
``` 
http://localhost:3333/opportunities
```
