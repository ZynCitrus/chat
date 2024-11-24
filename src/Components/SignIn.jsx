import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../fbconfig";

export function SignIn() {
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).catch((error) => console.error("Error signing in: ", error));
    };
  
    return <button onClick={signInWithGoogle}>LOGGA IN MED GOOGLE!</button>;
  }
  
 export function SignOutButton() {
    return auth.currentUser && (
      <button onClick={() => signOut(auth)}>LOGGA UT!</button>
    );
  }
  