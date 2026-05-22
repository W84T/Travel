
#!/bin/bash
# Start Docker containers in detached mode
echo "Starting Tourism in Malaysia deployment..."
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
echo "Services started successfully."
