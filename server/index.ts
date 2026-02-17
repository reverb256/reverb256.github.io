import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import session from 'express-session';
import Memorystore from 'memorystore';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import { setupRoutes } from './routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security middleware
app.use(helmet());

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '*' : true,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET || 'reverb256-secret-key-change-in-production',
  resave: false,
  saveUninitialized: true,
  store: new (Memorystore(session))({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../client')));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
setupRoutes(app);

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = parseInt(process.env.PORT || '5173');
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`\n🚀 Reverb256 Portfolio Development Server is running on port ${PORT}`);
  console.log(`🔗 Access URL: http://${HOST}:${PORT}`);
  console.log(`📋 API Endpoints: /api/*`);
  console.log(`\n✨ Ready - Development environment with API mocking`);
});

export default app;