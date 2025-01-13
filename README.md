# Teste-Ilumeo-Othon

## Descrição

Uma aplicação em Docker com Backend, Frontend e Banco de Dados de transações bancárias desenvolvida em Node.js, usando Nest.js e TypeORM no Backend e Mysql, como parte do teste de admissão da Cobuccio.


## Tecnologias Utilizadas
- **Node.js**: Stack principal da aplicação.
- **Nest.js**: Biblioteca para criação e gerenciamento de endpoints.
- **PostgreSQL**: Banco de dados utilizado para persistência.
- **TypeORM**: "_Object Relational Mapping_" para interagir com o banco de dados de forma mais simples.
- **Next**: Biblioteca para criação e execução de interface Frontend.

## Arquitetura Utilizada
- **Arquitetura modular padrão do Nest.js**:  </br>
- Utilizei aqui o formato fornecido pelo próprio Nest.js como padrão, de acordo com os comandos de geração de cada módulo (Nest generate module | controller | service <nome>).

## Funcionalidades
A API permite realizar as seguintes operações:
- **Criar um Usuário**: Feito através da inserção de dados cadastrais.
- **Pesquisar um Usuário**: Através da inserção do CPF.
- **Criação de hora trabalhada**:
- **Consulta de hora trabalhada**: 
- **Criação de Turno (shifts)**:
- **Consulta de Turno**: 


## OBSERVAÇÃO IMPORTANTE PARA O AVALIADOR:

* Não criei a tela de Hora de saída pois o prazo havia terminado.


## Instalação
Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
```bash
git clone https://github.com/othonaf/Teste-Ilumeo-Othon.git
```

2. Instale as dependências:

```bash
cd Teste-Ilumeo_othon
npm install
```
3. Inicie o compose docker:
   
```bash
cd backend-pontos
docker-compose up --build
```
4. Nesta pasta crie um arquivo .env com suas credenciais para as chaves abaixo:
   
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = postgres
DB_PASSWORD = sua_senha
DB_DATABASE = ilumeo-employees
  
5. Certifique-se de que o servidor Docker foi iniciado, se não tiver sido, inicie-o manualmente.

A API Backend estará disponível em http://localhost:3000.

## Exemplos de Uso:
Aqui estão alguns exemplos de como interagir com os endpoints da API (Documentação da minha aplicação no Postman).

https://documenter.getpostman.com/view/19721533/2sAYQXmrko

## Testes Automatizados:

Devido ao meu pouco tempo, não consegui criar os testes automatizados, mas costumo criar testes em Jest.js. Caso haja disponibilidade e interesse. o avaliador porderá ver alguns códigos de teste em meu GitHub.

* Exemplo: https://github.com/othonaf/Teste-Cobuccio-Othon/tree/main/api-cobuccio-othon/src/_testes


6. Após isso, navegue até a pasta do Frontend:

```bash
cd ilumeo-pontos
```
E inicie o servidor:

```bash
npm run dev
```

A aplicação deverá rodar na porta 3001 (partindo do princípio de que o backend já foi inicializado antes).

