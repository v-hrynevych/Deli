import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";

import { auth } from "../../../../firebase";

interface UseSignUpArgs {
  redirectUrl?: string;
}

export const useSignUp = (args?: UseSignUpArgs) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const router = useRouter();

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setIsLoading(false);
    }
  };

  if (args?.redirectUrl !== undefined && error === null) {
    router.push(args.redirectUrl);
  }

  return { signUp, isLoading, error };
};
