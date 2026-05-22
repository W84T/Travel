
# Tourism in Malaysia - Deployment & Operations Guide

## Cloud Provider Deployment Guides

### AWS (Elastic Container Service - ECS)
1. Push your Docker image to Amazon ECR.
2. Create an ECS Cluster (Fargate is recommended for zero-maintenance infrastructure).
3. Create a Task Definition utilizing your pushed ECR image. Mount EFS volumes for PocketBase `/pb_data` persistence.
4. Set up an Application Load Balancer (ALB) to route HTTP/HTTPS traffic to the ECS Service.

### DigitalOcean App Platform
1. Connect your GitHub repository to DigitalOcean.
2. DigitalOcean will automatically detect the `Dockerfile`.
3. Add a separate App Component for PocketBase using the `ghcr.io/pocketbase/pocketbase:latest` image and attach a Persistent Volume.
4. Set Environment Variables in the App Platform dashboard.

### Heroku
1. Create a `heroku.yml` to define the Docker build process.
2. Note: Heroku's ephemeral filesystem is **NOT** suitable for PocketBase out of the box. You must configure PocketBase to use an external S3-compatible storage bucket, or host PocketBase separately.

## CI/CD Pipeline Setup

### GitHub Actions
Create `.github/workflows/deploy.yml`:
- Trigger on `push` to `main`.
- Step 1: Run `npm install` and `npm run lint`.
- Step 2: Build the Docker image.
- Step 3: Push to your container registry (Docker Hub / ECR).
- Step 4: Trigger a webhook or SSH into the production server to run `./start.sh` or update the ECS service.

## Monitoring and Logging Setup
- **Docker Logs:** Use `docker-compose logs -f` locally or route logs to AWS CloudWatch / Datadog using Docker log drivers in `docker-compose.prod.yml`.
- **External Monitoring:** Integrate a service like Sentry or New Relic into the Node.js application for APM (Application Performance Monitoring). Set up UptimeRobot to ping the `http://yourdomain.com/` and `http://yourdomain.com/pb/` health check endpoints.

## Performance Optimization Tips
1. Use the provided `nginx.conf` which enables GZIP compression for text-based assets.
2. Leverage Vite's code-splitting in production builds.
3. Configure PocketBase to utilize S3 storage for images if user uploads scale beyond local disk capacity.

## Security Hardening Checklist
- [ ] Change the default `PB_ENCRYPTION_KEY` in `.env.docker`.
- [ ] Ensure PocketBase Admin UI `/_/` is restricted by a strong password, or bound to internal networks only if manageable via VPN.
- [ ] Implement Let's Encrypt SSL/TLS certificates via Nginx.
- [ ] Do not expose port 5000 (Backend API) or 8090 (PocketBase) directly to the public web; route everything through port 80/443 via Nginx reverse proxy.

## Disaster Recovery Procedures
1. Run `backup.sh` daily via cron (`0 2 * * * /path/to/backup.sh`).
2. Sync the resulting `tar.gz` files to an off-site location (e.g., AWS S3).
3. In case of failure, provision a new server, clone the repository, download the latest backup, and run `restore.sh <backup_file>`.
