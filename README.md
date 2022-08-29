# WA-Backend

- Intruções para executar

Vá até a pasta onde deseja salva-lo em seu computador, abra o terminal nessa pasta e use o comando:

```
git clone https://github.com/Leonardo-KF/WA-Backend.git
```

Em seguida entre pelo terminal na raiz do projeto com o seguinte comando:

```
cd .\WA-Backend\
```

Agora basta fazer a instalação das dependencias com o comando:

```
npm install
```

Com isso concluido, você irá precisar de uma instância do banco de dados MongoDb,
após ter a instância basta colocar a url de conexão com o banco dentro do arquivo .env.example dentro de aspas no campo: MONGO_URL.
Agora basta remover a extensão example deixando o arquivo da seguinte forma: .env

Após termos feito esse processo basta digitarmos o seguinte comando:

```
npm run build
```

E por fim para rodar o projeto use o comando:

```
npm run start
```

Para acessar a documentação da api agora abra seu melhor navegador e acesse o link:

```
http://localhost:3333/api-docs/
```
