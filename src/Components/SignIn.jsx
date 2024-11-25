import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../fbconfig";

import "../Design/SignIn.css";

export function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) =>
      console.error("Error signing in: ", error),
    );
  };

  return (
    <div className="signInWrapper">
      <button className="signInBtn" onClick={signInWithGoogle}>
        LOGGA IN MED GOOGLE!
      </button>
    </div>
  );
}

export function SignOutButton() {
  return (
    auth.currentUser && (
      <button className="signOutBtn" onClick={() => signOut(auth)}>
        LOGGA UT!
      </button>
    )
  );
}
