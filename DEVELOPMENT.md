# Development Guide

## Getting Started

### Prerequisites
- Node.js 18 or higher
- MongoDB 5.0+
- Redis 6.0+ (optional)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/investment-platform.git
   cd investment-platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.local.example .env.local
   npm run dev
   ```

## Project Architecture

### Frontend Architecture
```
Pages
  ↓
Components
  ↓
Hooks (Custom)
  ↓
Services (API calls via Axios)
  ↓
State Management (Zustand)
```

### Backend Architecture
```
Routes
  ↓
Controllers
  ↓
Services
  ↓
Models (MongoDB)
  ↓
Database
```

## Code Style Guide

### Frontend
- Use functional components with hooks
- Use camelCase for variables and functions
- Use PascalCase for component names
- Keep components small and focused
- Use Tailwind CSS classes

### Backend
- Use ES6+ syntax
- Use async/await instead of promises
- Keep route files clean, logic in controllers
- Use proper error handling
- Add JSDoc comments for functions

## Common Tasks

### Add a New API Endpoint

1. Create a route handler in `backend/src/routes/`
2. Create a controller in `backend/src/controllers/`
3. Create a service in `backend/src/services/` (if needed)
4. Update models if necessary
5. Write tests

### Add a New Frontend Page

1. Create a new file in `frontend/pages/`
2. Create components in `frontend/components/` (if needed)
3. Add routing if needed
4. Add API integration

### Database Migration

1. Update the model schema
2. Create a migration script in `backend/src/migrations/`
3. Run the migration
4. Update tests

## Testing

### Backend Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Tests
```bash
npm test
npm run test:watch
```

## Deployment

### Deploy to Heroku

**Backend**:
```bash
heroku create your-app-backend
git push heroku main:main
```

**Frontend**:
```bash
heroku create your-app-frontend
git push heroku main:main
```

### Deploy with Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify connection string in .env
- Check firewall settings

**Port Already in Use**
```bash
# Find process using port 3001
lsof -i :3001
# Kill process
kill -9 <PID>
```

**CORS Issues**
- Check CORS configuration in backend
- Verify frontend URL in allowed origins
- Check browser console for detailed errors

## Performance Tips

1. Use Redis for caching
2. Implement pagination for large datasets
3. Optimize images and assets
4. Use CDN for static files
5. Monitor database queries
6. Use lazy loading for components

---

For more help, see [README.md](../README.md)
