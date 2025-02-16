# 🎟️ Sistema de Venda de Ingressos  

Este é um sistema de venda de ingressos desenvolvido com **Node.js**, **Express**, **Sequelize** e **SQLite**.  

## 📌 Credenciais de Acesso  

- **Usuário Admin**  
  - **E-mail:** `admin@gmail.com`  
  - **Senha:** `admin123`  

## ⚙️ Instalação  

1. Clone este repositório:  
   ```sh
   git clone https://github.com/Daniela-Alves2004/sistema-venda-ingresso.git
   cd sistema-venda-ingresso
   ```
2. Instale as dependências:  
   ```sh
   npm install
   ```

## 🚀 Executando o Projeto  

Para iniciar o servidor, execute:  
```sh
node index.js
```

## 🗄️ Configuração do Banco de Dados  

### Criar o banco e rodar as migrações  
```sh
npx sequelize-cli db:migrate
```

### Popular o banco com dados iniciais  
```sh
npx sequelize-cli db:seed:all
```

## 📝 Observações  
- O projeto utiliza **JWT para autenticação**.  
- Certifique-se de configurar corretamente o arquivo `.env`.
