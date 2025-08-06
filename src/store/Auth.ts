import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { ID, Models, AppwriteException } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;
  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException }>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException }>;
  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession("session");
          set({ session });
        } catch (error: any) {
          console.log("error in verifying session", error);
          return;
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);

          if (!user.prefs?.reputation) {
            await account.updatePrefs<UserPrefs>({
              reputation: 0,
            });
          }

          set({ session, jwt, user });
          return { success: true };
        } catch (error: any) {
          console.log("error in login", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : undefined,
          };
        }
      },

      async createAccount(name: string, email: string, password: string) {
        console.log(
          name,
          email,
          password,
          "appwrite input data to create account"
        );
        try {
          const user = await account.create(
            ID.unique(),
            email.trim(),
            password.trim(),
            name.trim()
          );
          console.log("user created", user);
          return { success: true };
        } catch (error: any) {
          console.log("error in create account", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : undefined,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error: any) {
          console.log("error in logout", error);
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
