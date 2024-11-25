import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';

import {auth } from './fbconfig'
import { SignIn, SignOutButton } from './Components/SignIn';
import {ChatRoom}  from './Components/ChatRoom.jsx';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  

  if (error) {
    console.error("Authentication error:", error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatt - Firebase och React</h1>
        {user && <SignOutButton />}
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}



export default App;
