# PEX.Auth

PEX.Auth é uma API baseada em SOLID, construída utilizando Domain Driven Design (DDD) e Clean Architecture. O objetivo dessa API é fornecer funcionalidades para cadastro, login e autenticação de usuários, bem como autenticação de requisições entre aplicações.

## Funcionalidades

- Cadastro de usuários: Permite o registro de novos usuários na aplicação.
- Login de usuários: Permite que usuários autenticados façam login na aplicação.
- Autenticação e Permissionamento de usuários: Fornece mecanismos para autenticar e autorizar usuários.
- Autenticação de requisições entre aplicações: Permite autenticar e validar a integridade das requisições enviadas por outras aplicações.

## Tecnologias Utilizadas

- Linguagem de programação: Typescript
- Node.js

## Princípios
- Test Driven Development (TDD): Abordagem de desenvolvimento que prioriza a criação de testes antes da implementação do código (para mais detalhes, ler ![Manifesto TDD](https://tddmanifesto.com/getting-started/)).
- SOLID: Princípios de programação orientada a objetos para construção de um código limpo e de fácil manutenção.
- Domain Driven Design (DDD): Metodologia de desenvolvimento de software que busca alinhar o código com o domínio do negócio.
- Clean Architecture: Arquitetura de software que separa as preocupações em camadas, facilitando a manutenção e o teste do código.
- Banco de Dados: [especificar o banco de dados utilizado, por exemplo, SQL Server, MySQL, etc.]

## Arquitetura
- Esboço da arquitetura em desenvolvimento.
![architecture](https://github.com/rtisolucoesdesoftware/PEX.Auth/assets/78372916/c768cc24-feb5-4fc8-9b4d-11c366c59746)

# PEX.Authentication API

PEX.Auth is an API based on SOLID, built using Domain Driven Design (DDD) and Clean Architecture.

## Instalação

- Tenha [Node.js](https://nodejs.org) no seu ambiente de desenvolvimento
- Utilize o gerenciador de pacotes [npm](https://www.npmjs.com/) para instalar as dependências do projeto.

```bash
npm install
```

## Scripts Disponíveis
No diretório do projeto, você pode executar os seguintes scripts:

### `npm start`

Inicia a API em modo de produção.\
Abra [http://localhost:3000](http://localhost:6060) para visualizar no browser.

### `npm run build`

Executa build do projeto.\
Remove o diretório `dist` e compila o código Typescript.

### `npm run debug`

Inicia a API em modo Debug usando nodemon.\
Mantém o modo watch ligado na pasta `dist` por qualquer mudança e habilita o debug na porta 9222.

### `npm run up`

Executa o buil do projeto e inicia a API usando docker-compose.\
Executa os containers em modo detach.

### `npm run down`

Para os containers da API usando docker-compose.\

### `npm test`

Executa todos os testes de unidade.\
Os testes são executados silenciosamente sem um output detalhado. Os testes executam sequencialmente. 
Se não existem testes, ele encerra com uma mensagem de sucesso.

### `npm run test:verbose`

Executa os testes de unidade com um output detalhado
Executa os testes sequencialmente.

### `npm run test:unit`

Os testes de unidades são executados em modo de watch.\
Os testes são executados interativamente, observando por qualquer mudança nos arquivos para reexecutar os testes.

### `npm run test:integration`

Executa os testes de integração em modo watch.\
Os testes são executados interativamente, observando por qualquer mudança nos arquivos para reexecutar os testes.

### `npm run test:staged`

Executa os testes relacionados a arquivos modificados e que estejam em staged para commit.\
Os testes são executados em modo watch.

### `npm run test:ci`

Executa os testes do CI.\
The tests are executed with code coverage.
