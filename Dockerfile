FROM python:3.8-slim

# Install build dependencies
RUN apt-get update && apt-get install -y gcc git

# Install Rasa
RUN pip install --upgrade pip
RUN pip install rasa

# Copy your Rasa project files
COPY . /app
WORKDIR /app

# Expose the port Rasa will run on
EXPOSE 10000

# Run Rasa server
CMD ["rasa", "run", "--enable-api", "--cors", "*", "--port", "10000"] 