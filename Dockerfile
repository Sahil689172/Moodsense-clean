FROM python:3.8-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y gcc git build-essential libpq-dev libffi-dev libssl-dev python3-dev && \
    apt-get clean

# Upgrade pip and install Rasa
RUN pip install --upgrade pip
RUN pip install rasa

# Copy your Rasa project files
COPY . /app
WORKDIR /app

# Expose the port Rasa will run on
EXPOSE 10000

# Run Rasa server
CMD ["sh", "-c", "rasa run --enable-api --cors '*' --port ${PORT:-10000}"] 