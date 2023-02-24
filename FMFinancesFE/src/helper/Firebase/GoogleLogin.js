import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './FirebaseSetup';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  return { token, user };
};

export default signInWithGoogle;
