
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser
} from "firebase/auth";

import {
  ref,
  get,
  set,
  remove,
  runTransaction
} from "firebase/database";

import { auth, database } from "../Firebase/firebase";

const getUsernameEmail = (username) =>
  `${username.trim().toLowerCase()}@aura.local`;

export const signup = async (username, password) => {
  username = username.trim().toLowerCase();

  if (!/^[a-z0-9_]{3,20}$/.test(username)) {
    throw new Error("Username must be 3-20 characters (letters, numbers, underscore).");
  }

  if (password.length < 6) {
    throw new Error("Password must contain at least 6 characters.");
  }

  const usernameRef = ref(database, `usernames/${username}`);

  // Reserve username so duplicate accounts cannot claim it.
  const reservation = await runTransaction(usernameRef, (current) =>
    current === null ? "reserved" : undefined
  );

  if (!reservation.committed) {
    throw new Error("This username is already taken.");
  }

  let user = null;

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      getUsernameEmail(username),
      password
    );

    user = credential.user;

    await updateProfile(user, {
      displayName: username
    });

    await set(ref(database, `users/${user.uid}`), {
      username,
      createdAt: Date.now()
    });

    await set(usernameRef, user.uid);

    return user;
  } catch (error) {
    if (user) {
      await deleteUser(user);
    }

    const current = await get(usernameRef);

    if (current.val() === "reserved") {
      await remove(usernameRef);
    }

    throw error;
  }
};

export const login = async (username, password) => {
  username = username.trim().toLowerCase();

  const usernameSnapshot = await get(
    ref(database, `usernames/${username}`)
  );

  if (!usernameSnapshot.exists() || usernameSnapshot.val() === "reserved") {
    throw new Error("Invalid username or password.");
  }

  const credential = await signInWithEmailAndPassword(
    auth,
    getUsernameEmail(username),
    password
  );

  return credential.user;
};

export const logout = () => signOut(auth);
