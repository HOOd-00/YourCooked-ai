FROM python:3.10-slim

# set working dir in container
WORKDIR /app

# copy requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy all the code
COPY . .

# set port 8000
EXPOSE 8000

# server run command, when container start working
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]