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
EXPOSE 5005

# Set SQLAlchemy warning suppression
ENV SQLALCHEMY_SILENCE_UBER_WARNING=1
RUN pip install "sqlalchemy<2.0"

# Run Rasa server
CMD ["sh", "-c", "rasa run --enable-api --cors '*' --port ${PORT:-5005} --debug"]

RUN python -c "import sqlalchemy; print('SQLAlchemy version:', sqlalchemy.__version__)" 
