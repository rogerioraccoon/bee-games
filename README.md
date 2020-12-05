# Bee Games Store

## Dependências

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Instruções

- **Passo 0:** Instalar todas as dependências

- **Passo 1:** Clonar o repositório git

`git clone `

- **Passo 2:** Importar o dump do banco de dados

`mongorestore --host <host:port> --username <username> --password <password> -d store --drop dump/store`

- **Passo 3:** Na pasta /api/.env alterar a variável `DB_CONNECTION` com suas credenciais de conexão ao banco de dados 

- **Passo 4:** Na pasta /api instalar os pacotes NodeJS

`cd api/`

`yarn install` ou `npm install`

- **Passo 5:** Na pasta /api rodar o backend

`yarn start` ou `npm start`

- **Passo 6:** Na pasta /ui instalar os pacotes NodeJS

`cd ui/`

`yarn install` ou `npm install`

- **Passo 7:** Na pasta /ui rodar o backend

`yarn start` ou `npm start`

- **Passo 8:** Na url `http://localhost:3000` estará o ecommerce rodando

## Funcionalidades

Para o usuário comum:

- **Página inicial** com a lista de todos os produtos.
- **Página de categoria** com a lista dos produtos de uma categoria específica.
- **Página do produto** com informações do produto e a opção de adicionar no carrinho.
- **Página do carrinho** com os produtos adicionados e a possibilidade de alterar a quantidade. Caso o usuário esteja logado é enviado para a página de endereço de entrega, caso contrário, para a página de login.
- **Página de endereço de entrega** puxando a informação de endereço do usuário logado e permitindo alterar o endereço de entrega.
- **Página de pagamento** para o usuário informar as informações do cartão e finalizar a transação. Caso tudo esteja correto, o usuário é enviado para a página de histórico de pedidos.
- **Página de histórico** de pedido mostra todos os pedidos realizados pelo usuário logado
- **Página de perfil** mostra as informações pessoais e endereço do usuário logado, permitindo alteração e mudança de senha.
- **Página de login** para o usuário realizar o acesso.
- **Página de cadastro** para a criação de um novo usuário.

Para o usuário administrador:

- **Página de login** para o usuário realizar o acesso.
- **Gerenciamento de produtos** permitindo a listagem e edição de produtos, adição de novo e por fim pausa para não aparecer mais na loja.
- **Gerenciamento de categorias** permitindo a listagem e edição de categorias, adição de novo e por fim pausa para não aparecer mais na loja.
- **Gerenciamento de clientes** permitindo a listagem, visualização das informações e histórico de compras, além de desativar negando acesso a loja.
- **Gerenciamento de administradores** permitindo a listagem e edição de usuários, adição de novo e por fim desativar negando acesso a loja.
- **Relatórios** das últimas transações realizadas na loja, além de histórico de vendas por produto.

**Todas as páginas e rotas de API estão validando a autorização do usuário para acesso.**

## Tecnologias

Para o **backend**, desenvolvemos uma API REST utilizando **NodeJS** e o **framework Express**. Para armazenar os dados foi escolhido o banco de dados **MongoDB** e para conexão a **biblioteca mongoose**.

Para trabalhar a autenticação de usuários usamos a **biblioteca jsonwebtoken** e para o upload das imagens dos produtos a **biblioteca multer**.

No frontend, desenvolvemos uma aplicação usando **ReactJS** e duas bibliotecas específicas: **Styled Components** para auxiliar na estilização e **React Router** para a criação das páginas.

As informações do carrinho e se o usuário está logado são armazenados em **LocalStorage**, dessa forma, se o usuário retornar a aplicação, essas informações serão persistidas.

## Organização

Na pasta `api`está o projeto do backend, tendo a seguinte organização:

- `/configs`contém as informações de configuração do multer para upload de imagens
- `/lib` contém as funções responsáveis para verificar se o usuário tem permissão para acessar as rotas
- `/models` contém as definições de cada tabela do banco de dados
- `/routes` contém as funções para cuidar de cada rota da API
- `/uploads` contém as imagens que foram realizadas upload
- `.env`contém informações de conexão com o banco de dados
- `app.js` é o arquivo principal da API que conecta com o banco de dados e define todas as rotas

Na pasta `ui`está o projeto do frontend, tendo a seguinte organização:

- `/public`fica o arquivo final HTML da aplicação
- `/src` contém todos os arquivos principais da aplicação
- `/src/components` contém os componentes utilizados pelas páginas
- `/src/images` contém as imagens estáticas
- `/src/pages` contém as páginas da aplicação
- `/src/styles` contém os estilos reusáveis
- `/src/App.js` contém a definição das rotas
- `/src/index.js` arquivo principal do ReactJs
- `/src/store.js` contém o código responsável por armazenar informações que podem ser compartilhadas entre as páginas, como se o usuário está logado ou itens do carrinho

Na pasta `static` contém os arquivos puros HTML, CSS e JS das etapas anteriores.

Na parta `dump` contém uma cópia do banco de dados.