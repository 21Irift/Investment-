# Investment Platform - Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- AWS/GCP/Azure account (for cloud deployment)
- SSL certificate
- Domain name

## Local Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Cloud Deployment

### AWS Deployment

1. **Create EC2 Instance**
   ```bash
   # Ubuntu 20.04 LTS
   ```

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo usermod -aG docker $USER
   ```

3. **Deploy Application**
   ```bash
   git clone your-repo
   cd your-repo
   docker-compose -f docker-compose.prod.yml up -d
   ```

4. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
       }

       location /api {
           proxy_pass http://localhost:3001;
       }
   }
   ```

### Heroku Deployment

**Backend**:
```bash
heroku login
heroku create investment-platform-api
git push heroku main
heroku config:set MONGODB_URI=your_mongodb_uri
```

**Frontend**:
```bash
heroku create investment-platform-web
heroku config:set NEXT_PUBLIC_API_URL=your_backend_url
git push heroku main
```

## Environment Configuration

### Production Environment Variables

```env
# Backend
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
REDIS_URL=your_redis_url

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=Investment Platform
```

## SSL/TLS Certificate

### Using Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

## Monitoring and Logging

### Setup Monitoring

1. **Application Logging**
   - Use Winston or Morgan
   - Store logs in ELK Stack

2. **Error Tracking**
   - Setup Sentry for error monitoring
   - Configure alerts

3. **Performance Monitoring**
   - Use New Relic or DataDog
   - Monitor response times
   - Track database queries

## Backup and Recovery

### Database Backup

```bash
# Daily backup
mongodump --uri "mongodb://user:pass@host:27017/database" --out ./backup

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri "$MONGODB_URI" --out "$BACKUP_DIR/backup_$DATE"
```

### Restore Database

```bash
mongorestore --uri "mongodb://user:pass@host:27017/database" ./backup
```

## Scaling

### Horizontal Scaling

1. **Load Balancer** (Nginx)
   ```bash
   upstream backend {
       server backend1:3001;
       server backend2:3001;
       server backend3:3001;
   }
   ```

2. **Database Replication**
   - Setup MongoDB replica set
   - Configure sharding for large datasets

3. **Redis Cluster**
   - Setup Redis cluster for better performance

### Vertical Scaling

- Increase server resources
- Optimize database queries
- Implement caching

## CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        run: |
          git push https://heroku:${{ secrets.HEROKU_API_KEY }}@git.heroku.com/${{ secrets.HEROKU_APP_NAME }}.git main
```

## Security Checklist

- [ ] Enable HTTPS
- [ ] Setup firewall rules
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Enable authentication
- [ ] Setup regular backups
- [ ] Monitor for vulnerabilities
- [ ] Use secure headers (Helmet)
- [ ] Implement logging and monitoring

## Troubleshooting

### Common Issues

**Application won't start**
- Check environment variables
- Verify database connection
- Check logs: `docker logs container_name`

**High Memory Usage**
- Check for memory leaks
- Increase container memory limit
- Optimize queries

**Slow Response Times**
- Check database performance
- Enable caching
- Add load balancer

---

For additional help, contact: support@investmentplatform.com
