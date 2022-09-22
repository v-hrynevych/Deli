import { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "../../firebase";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, setUser);

  return user;
};
