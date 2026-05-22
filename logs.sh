
#!/bin/bash
# View live logs for all services
echo "Attaching to live logs. Press Ctrl+C to exit."
docker-compose logs -f
