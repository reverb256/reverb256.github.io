import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-page min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}