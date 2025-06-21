
FROM openjdk:17-jdk-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Download and install signal-cli
RUN wget https://github.com/AsamK/signal-cli/releases/download/v0.12.8/signal-cli-0.12.8.tar.gz \
    && tar -xzf signal-cli-0.12.8.tar.gz \
    && mv signal-cli-0.12.8 /opt/signal-cli \
    && rm signal-cli-0.12.8.tar.gz

# Download signal-cli-rest-api
RUN wget https://github.com/bbernhard/signal-cli-rest-api/releases/download/0.74/signal-cli-rest-api-0.74.jar \
    && mv signal-cli-rest-api-0.74.jar signal-cli-rest-api.jar

# Create data directory for signal-cli configuration
RUN mkdir -p /app/data

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8080/v1/about || exit 1

# Run the application
CMD ["java", "-jar", "signal-cli-rest-api.jar", "--signal-cli-config=/app/data", "--host=0.0.0.0", "--port=8080"]
