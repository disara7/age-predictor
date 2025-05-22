"use client"; // Add this to mark the file as a client component

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const Navbar = () => {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here, like clearing tokens or session data
    localStorage.removeItem('authToken'); // Example if using localStorage
    // Redirect to the homepage or login page after logging out
    router.push('/');
  };

  // Check if the user is logged in
  const isLoggedIn = Boolean(localStorage.getItem('authToken')); // Adjust based on your auth method

  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
        <li>
          <Link href="/" style={{ color: '#fff' }}>Home</Link>
        </li>
        <li>
          <Link href="/about" style={{ color: '#fff' }}>About</Link>
        </li>

        {/* Conditionally render the Prediction link based on login status */}
        {isLoggedIn && (
          <li>
            <Link href="/prediction" style={{ color: '#fff' }}>Prediction</Link>
          </li>
        )}
        
        {/* Logout button */}
        <li>
          <button 
            onClick={handleLogout} 
            style={{
              color: '#fff', 
              backgroundColor: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              padding: '10px',
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
