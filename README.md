# Docker Compose Setup for Backend, Frontend, and Database

Este projeto está configurado para usar o Docker Compose para gerenciar um aplicativo full-stack com os seguintes serviços:

- **Backend**: Backend Python baseado em Flask.
- **Frontend**: Frontend JavaScript baseado em React.
- **Database**: Banco de dados PostgreSQL.

## Services

### Backend
- **Nome do contêiner**: `flask-backend`
- **Build Context**: `./backend`
- **Dockerfile**: `Dockerfile` no `./backend`
- **Portas**: Expõe a porta `5000` na máquina host.
- **Variáveis de Ambiente**:
  - `FLASK_ENV=development`
  - `DATABASE_URL=postgresql://user:password@db:5432/mydatabase`
- **Dependências**:
  - Depende do serviço `db`.
- **Volumes**:
  - Monta o diretório raiz do projeto em `/app` dentro do contêiner.

### Frontend
- **Nome do contêiner**: `react-frontend`
- **Build Context**: `./frontend`
- **Dockerfile**: `Dockerfile` ino `./frontend`
- **Portas**: Expõe a porta `3000` na máquina host.
- **Volumes**:
  - Monta o diretório `./frontend` em `/app` dentro do contêiner.

### Database (PostgreSQL)
- **Nome do contêiner**: `postgres-db`
- **Imagem**: `postgres:13`
- **Variáveis ​​de ambiente**:
  - `POSTGRES_USER=user`
  - `POSTGRES_PASSWORD=password`
  - `POSTGRES_DB=mydatabase`
- **Volumes**:
  - Usa o volume `postgres_data` para persistir dados em `/var/lib/postgresql/data`.
- **Portas**: Mapeia a porta `5435` no host para a porta `5432` dentro do contêiner.

## Volumes
- **`postgres_data`**:
  - Driver: `local`
  - Persiste os arquivos de banco de dados PostgreSQL para evitar perda de dados quando o contêiner é removido.

## Uso

### Starting the Services
Execute o seguinte comando para compilar e iniciar todos os serviços:

```bash
docker-compose up --build