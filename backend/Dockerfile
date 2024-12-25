# Imagem base com Python
FROM python:3.10-slim

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependências
COPY requirements.txt requirements.txt

# Instalar as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo o código do projeto
COPY . .

# Expor a porta 5000 (porta padrão do Flask)
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["python", "run.py"]
