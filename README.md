# E-commerce

Choose your language / Escolha seu idioma

- [English](#english)
- [Português](#português)


## English

An e-commerce application built with Angular, TypeScript, and Sass. It features a shopping cart, product catalog, discount support, and a RESTful API using json-server and supports multiple languages (PT/EN). Deploy-ready for platforms like Render.


## 🚀 Features

- ✅ Product listing by category
- ✅ Shopping cart with quantity control
- ✅ Add, edit quantity, and remove products from cart
- ✅ Cart total and discount calculation
- ✅ Backend mock with JSON Server
- ✅ Deployment-ready (frontend + backend)
- ✅ Responsive and styled with Sass
- ✅ Multi-language support (🇧🇷 Portuguese / 🇺🇸 English)

## 🖼️ Preview

![preview](https://e-commerce-buy-things.vercel.app/preview.png)


## 🧠 Technologies used

- **Angular**
- **TypeScript** 
- **Sass** 
- **i18next + react-i18next** 
- **JSON Server (REST API)**
- **Express (for deployment)** 

## 📦 Install

### 1. Clone the repository

```bash
git clone https://github.com/IzaDeveloper/ecommerce.git
cd ecommerce
```

### 2. Install the dependencies
```bash
npm install
```

### 3. Start the project (frontend only)
```bash
ng serve
```

### 4. Run JSON Server (backend only)
```bash
npm run server
```

## 🌐 API Endpoints (JSON Server)

| Endpoint                          | Description                       |
| --------------------------------- | --------------------------------- |
| `GET /products`                   | Get all products                  |
| `GET /products/:id`               | Get a single product by ID        |
| `GET /products?category=Category` | Get products filtered by category |
| `GET /products?offer=true`        | Get products with active offers   |

## 🌍 Language Support

Translation is done using i18next.
- en.json
- pt.json

## 🧰 Main Dependencies

| Package       | Purpose                   |
| ------------- | ------------------------- |
| `@angular/*`  | Frontend framework        |
| `typescript`  | Static typing             |
| `sass`        | Styling                   |
| `json-server` | Mock REST API             |
| `express`     | Server for production use |

👨‍💻 Author

Developed by [Izabelle](https://github.com/IzaDeveloper) 💻

## Português

Um aplicativo de e-commerce desenvolvido com Angular, TypeScript e Sass. Conta com listagem de produtos, carrinho de compras, suporte a descontos e API REST simulada com json-server e suporte a múltiplos idiomas (PT/EN). Pronto para deploy em plataformas como Render.

## 🚀 Funcionalidades

- ✅ Listagem de produtos por categoria
- ✅ Carrinho com controle de quantidade
- ✅ Adicionar, editar quantidade e remover produtos do carrinho
- ✅ Cálculo de total e desconto
- ✅ API fake com JSON Server
- ✅ Pronto para deploy (frontend + backend)
- ✅ Responsivo e estilizado com Sass
- ✅ Suporte a múltiplos idiomas (🇧🇷 Português / 🇺🇸 Inglês)

## 🖼️ Demonstração

![preview](https://e-commerce-buy-things.vercel.app/preview.png)


## 🧠 Tecnologias utilizadas

- **Angular**
- **TypeScript** 
- **Sass** 
- **i18next + react-i18next** 
- **JSON Server (API REST)**
- **Express (para produção)** 

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/IzaDeveloper/ecommerce.git
cd ecommerce
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o projeto (apenas front-end)
```bash
ng serve
```

### 4. Inicie o JSON Server (somente backend)
```bash
npm run server
```

## 🌐 Endpoints da API (JSON Server)


## 🌍 Suporte a idiomas

A tradução é feita com i18next.

- en.json
- pt.json

## 🧰Dependências principais

| Endpoint                           | Descrição                           |
| ---------------------------------- | ----------------------------------- |
| `GET /products`                    | Retorna todos os produtos           |
| `GET /products/:id`                | Retorna um produto pelo ID          |
| `GET /products?category=Categoria` | Retorna produtos por categoria      |
| `GET /products?offer=true`         | Retorna produtos com ofertas ativas |

👨‍💻Autor

Desenvolvido por [Izabelle](https://github.com/IzaDeveloper) 💻
