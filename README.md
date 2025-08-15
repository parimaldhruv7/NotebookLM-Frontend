# Google NotebookLM Clone - Frontend

A React frontend application for the NotebookLM clone that allows users to upload PDF documents and interact with them through an AI-powered chat interface.

## Features

- **PDF Upload & Viewing**: Upload large PDF files with drag-and-drop support
- **Interactive PDF Viewer**: Navigate through documents with zoom controls and page navigation
- **AI-Powered Chat**: Ask questions about document content and get intelligent responses
- **Citation System**: Click citation buttons to jump to specific pages in the PDF
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Processing**: Efficient document processing with vector-based search

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- React Dropzone for file uploads
- Vite for development and building

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see backend README)

### 1. Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the frontend root:

```env
VITE_API_URL=https://notebooklm-backend-o5qo.onrender.com
```

### 3. Start the Frontend

```bash
# Start development server
npm run dev
```

This will start the frontend development server on `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Backend Connection

### Local Development
The frontend connects to the backend API running on `https://notebooklm-backend-o5qo.onrender.com` by default.

### Production Setup
1. Update `VITE_API_URL` in your `.env` file to point to your deployed backend
2. Build the frontend: `npm run build`
3. Deploy the `dist` folder to your hosting provider

### Backend Requirements
This frontend requires the NotebookLM backend to be running. The backend should provide:

- `POST /api/upload` - PDF upload endpoint
- `POST /api/chat` - Chat message endpoint  
- `GET /api/document/:id` - Document info endpoint
- `GET /uploads/:filename` - Static file serving for PDFs

See the backend README for setup instructions.

## Usage

1. **Upload PDF**: Drag and drop a PDF file or click to select one
2. **Wait for Processing**: The system will extract and process the document content
3. **Start Chatting**: Ask questions about the document in the chat interface
4. **Navigate with Citations**: Click citation buttons to jump to specific pages
5. **Explore**: Use the PDF viewer controls to zoom and navigate through the document

## Components
- `FileUpload`: Drag-and-drop PDF upload interface
- `PDFViewer`: PDF display with navigation and zoom controls
- `ChatInterface`: Chat UI with message history and citations
- `App`: Main application orchestrating all components

## API Integration
The frontend uses a centralized API configuration in `src/config/api.ts` that handles:
- Base URL configuration
- Request/response handling
- Error management
- Type-safe API calls

## Customization

### Styling
The application uses Tailwind CSS. Modify `tailwind.config.js` to customize the design system.

### API Configuration
Update `src/config/api.ts` to modify API endpoints or add new functionality.

## Deployment

### Static Hosting (Netlify/Vercel/GitHub Pages)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting provider:
   - `VITE_API_URL`: Your backend API URL

### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables

- `VITE_API_URL`: Backend API base URL (default: https://notebooklm-backend-o5qo.onrender.com)

## Troubleshooting

### Common Issues

1. **API Connection Errors**: 
   - Verify backend is running on the correct port
   - Check VITE_API_URL environment variable
   - Ensure CORS is properly configured on backend

2. **PDF Upload Issues**:
   - Check file size limits on backend
   - Verify file format is PDF
   - Check network connectivity

3. **Build Errors**: 
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run build`

## License

This project is for educational and demonstration purposes. Please ensure compliance with OpenAI's usage policies and any applicable licenses for dependencies.