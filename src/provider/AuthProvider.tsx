import React, { createContext, ReactNode, useEffect, useState } from "react";
import app from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

// Firebase User টাইপ বা null
type UserType = FirebaseUser | null;

// AuthContext এর টাইপ ডিফাইনেশন
interface AuthContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  createUser: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  loginUser: (email: string, password: string) => Promise<any>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  profile: (updateData: UpdateProfileRequest) => Promise<void>;
  createUserWithLoginGoogle: () => Promise<any>;
  createUserWithGithub: () => Promise<any>;
  resetPassword: (email: string) => Promise<void>;
}

// Context তৈরি, ডিফল্ট undefined দিয়ে
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ইউজার তৈরি (রেজিস্ট্রেশন)
  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  // গুগল লগইন/রেজিস্ট্রেশন
  const createUserWithLoginGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // গিটহাব লগইন/রেজিস্ট্রেশন
  const createUserWithGithub = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // ইউজার লগইন
  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  // পাসওয়ার্ড রিসেট ইমেইল পাঠানো
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // প্রোফাইল আপডেট (নাম, ছবি ইত্যাদি)
  const profile = (updateData: UpdateProfileRequest) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    return updateProfile(auth.currentUser, updateData);
  };

  // লগআউট
  const logout = () => {
    return signOut(auth);
  };

  // ইউজার স্টেট মনিটর (লগইন/লগআউট অবস্থা)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // কন্টেক্সট এ সব ফাংশন এবং ভেরিয়েবল পাস করা
  const authData: AuthContextType = {
    user,
    setUser,
    createUser,
    logout,
    loginUser,
    loading,
    setLoading,
    profile,
    createUserWithLoginGoogle,
    createUserWithGithub,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
