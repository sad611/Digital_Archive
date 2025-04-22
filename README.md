# Projeto Full Stack - NestJS + Prisma + React

> ⚠️ **Observações importantes**:
> 
> - A **integração com o Archivematica** não foi realizada com sucesso. Apesar das minhas tentativas de configuração, não foi possível realizar transferências nem mesmo pelo dashboard do Archivematica, rodava infinitamente a transferência do documento. Devido ao tempo que gastei tentando fazer funcionar, decidi por abandonar e focar um pouco mais nos outros requisitos
> - A funcionalidade de **upload de arquivos na tela "Home"** ainda **não está implementada**.
> - A **visualização e o download de PDFs** estão sendo feitos de forma **estática**, a partir do diretório `public/docs` no backend.

## Arquitetura da Solução

Este projeto é uma aplicação **full-stack** composta por:

- **Back-end:** [NestJS](https://nestjs.com/) com [Prisma ORM](https://www.prisma.io/)  
  - Conecta-se a um banco de dados PostgreSQL
  - Usa JWT para autenticação
  - Expõe uma API REST
- **Front-end:** [React CRA (Create React App)](https://create-react-app.dev/)  
  - Comunicação com a API via `REACT_APP_API_URL`
- **Banco de dados:** PostgreSQL 15  
- **Gerenciamento de containers:** Docker + Docker Compose

A comunicação entre os serviços ocorre dentro da rede Docker. A aplicação está dividida em três serviços:

```
[React Frontend] <--> [NestJS Backend] <--> [PostgreSQL]
```

---

## Como executar com Docker

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/sad611/Digital_Archive.git
   cd cd Digital_Archive/digital_archive/
   ```

2. Ajuste os arquivos `.env` conforme necessário (veja a seção abaixo).

3. Execute o Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Acesse os serviços:

   - Backend: [http://localhost:3000](http://localhost:3000)
   - Frontend: [http://localhost:5173](http://localhost:5173)

---

## Variáveis de Ambiente

### Backend (`./backend/.env`)

```env
# URL de conexão com o banco (fora do Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"

# Chave de criptografia usada no JWT ou dados sensíveis
ENCRYPT_KEY="9FHUI8evi3XY3yEGUeKU0JisHQiPV1Kz"
```

> Dentro do container, a URL do banco já é injetada pelo Docker Compose:
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb
```

---

### Frontend (`./frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:3000
```

> O React usa `REACT_APP_` como prefixo obrigatório para que variáveis estejam disponíveis no ambiente do navegador.

---

## Estrutura dos Serviços no `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:15
    ...

  backend:
    build: ./backend
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/mydb
      ENCRYPT_KEY: ...
    ...

  frontend:
    build: ./frontend
    ports:
      - '5173:5173'
    environment:
      - REACT_APP_API_URL=http://localhost:3000
    ...
```

---

## Demonstração

Abaixo estão algumas capturas de tela da interface da aplicação:

![tela_registro](https://github.com/user-attachments/assets/efb0934d-8b5d-4da0-bb0b-aafa8318e6b1)

![tela_login](https://github.com/user-attachments/assets/c6c07c82-dfea-4dc2-92ce-e05ee43eaa1a)

![tela_home](https://github.com/user-attachments/assets/cb7fc9e0-8e33-44f6-9c1d-b748061e3942)
