# Setup Instructions for NotebookLM Clone

This guide will help you set up both the frontend and backend components of the NotebookLM clone application.

## Project Structure

```
notebooklm-clone/
├── backend/                 # Node.js backend API
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Backend environment template
│   └── README.md           # Backend documentation
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── config/            # API configuration
│   └── ...
├── package.json           # Frontend dependencies
├── .env.example          # Frontend environment template
└── README.md             # Frontend documentation
```

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_openai_api_key_here

# Start the backend server
npm run dev
```

The backend will run on `https://notebooklm-backend-o5qo.onrender.com`

### 2. Frontend Setup

```bash
# Navigate back to project root (if in backend directory)
cd ..

# Install frontend dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed (default backend URL is already set)
# VITE_API_URL=https://notebooklm-backend-o5qo.onrender.com

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Detailed Setup

### Backend Requirements

1. **Node.js**: Version 16 or higher
2. **OpenAI API Key**: Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

### Backend Environment Variables

Create `backend/.env` with:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend Environment Variables

Create `.env` in the project root with:
```env
VITE_API_URL=https://notebooklm-backend-o5qo.onrender.com
```

## Running Both Services

### Option 1: Separate Terminals
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd ..
npm run dev
```

### Option 2: Using Process Managers
```bash
# Install PM2 globally
npm install -g pm2

# Start backend
cd backend
pm2 start server.js --name "notebooklm-backend"

# Start frontend
cd ..
pm2 start "npm run dev" --name "notebooklm-frontend"

# View logs
pm2 logs
```

## Testing the Setup

1. **Backend Health Check**:
   ```bash
   curl https://notebooklm-backend-o5qo.onrender.com/api/health
   ```
   Should return: `{"status":"OK","message":"NotebookLM Backend is running",...}`

2. **Frontend Access**:
   Open `http://localhost:5173` in your browser

3. **Full Integration Test**:
   - Upload a PDF file through the frontend
   - Ask a question in the chat interface
   - Verify citations work by clicking them

## Production Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Environment Variables**:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   FRONTEND_URL=https://your-frontend-domain.com
   NODE_ENV=production
   ```

2. **Deploy the backend folder** to your hosting service

### Frontend Deployment (Netlify/Vercel)

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Environment Variables**:
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

3. **Deploy the `dist` folder** to your hosting service

## Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**
   - Ensure backend is running on port 3001
   - Check `VITE_API_URL` in frontend `.env`
   - Verify CORS settings in backend

2. **"OpenAI API Error"**
   - Check your OpenAI API key is valid
   - Verify you have sufficient credits
   - Check rate limits

3. **"PDF Upload Failed"**
   - Ensure file is under 50MB
   - Verify file is a valid PDF
   - Check backend logs for errors

4. **"Module not found" errors**
   - Delete `node_modules` and reinstall:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

### Debug Mode

Enable detailed logging:

**Backend**: Set `NODE_ENV=development` in `backend/.env`
**Frontend**: Check browser console for errors

### Port Conflicts

If ports 3001 or 5173 are in use:

**Backend**: Change `PORT` in `backend/.env`
**Frontend**: Change `VITE_API_URL` in `.env` and use `npm run dev -- --port 3000`

## Development Workflow

1. **Start both services** using the setup instructions above
2. **Make changes** to either frontend or backend code
3. **Hot reload** will automatically update the applications
4. **Test changes** by uploading PDFs and using the chat interface
5. **Check logs** in terminal for any errors

## API Documentation

The backend provides these endpoints:
- `GET /api/health` - Health check
- `POST /api/upload` - Upload PDF
- `POST /api/chat` - Send chat message
- `GET /api/document/:id` - Get document info
- `GET /uploads/:filename` - Serve PDF files

See `backend/README.md` for detailed API documentation.

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Verify all environment variables are set
3. Check both frontend and backend logs
4. Ensure all dependencies are installed correctly