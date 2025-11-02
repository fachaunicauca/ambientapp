import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { profileRequest, registerRequest } from "@/api/auth";
import { User } from "@/interface/user";

export interface Profile {
  _id: string;
  email: string;
  name: string;
  roles: string[];
}

type State = {
  token: string | null;
  profile: Profile | null;
  isAuth: boolean;
  errors: string | null;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: Profile) => void;
  register: (user: User) => void;
  logout: () => void;
  cleanErrors: () => void;
};

let store: any = null;

export const useAuthStore = (() => {
  if (typeof window === "undefined") {
    // SSR: devuelve un store "falso" vacío
    return () => ({
      token: null,
      profile: null,
      isAuth: false,
      errors: null,
      setToken: () => {},
      setProfile: () => {},
      register: async () => {},
      logout: () => {},
      cleanErrors: () => {},
    });
  }

  if (!store) {
    store = create(
      persist<State & Actions>(
        (set) => ({
          token: null,
          profile: null,
          isAuth: false,
          errors: null,
          setToken: (token: string) =>
            set(() => ({
              token,
              isAuth: !!token,
            })),
          register: async (user: User) => {
            try {
              const resRegister = await registerRequest(user);
              set(() => ({
                token: resRegister.data.token,
                isAuth: true,
              }));
            } catch (error) {
              if (error instanceof Error) {
                set(() => ({
                  errors: error.message,
                }));
              } else {
                set(() => ({
                  errors: "Error inesperado",
                }));
              }
            }
          },
          getProfile: async () => {
            const resProfile = await profileRequest();
            set(() => ({
              profile: resProfile.data,
            }));
          },
          setProfile: (profile: Profile) =>
            set(() => ({
              profile,
            })),
          logout: () =>
            set(() => ({ token: null, profile: null, isAuth: false })),
          cleanErrors: () => set(() => ({ errors: null })),
        }),
        {
          name: "auth",
          storage: createJSONStorage(() => localStorage),
        }
      )
    );
  }

  return store;
})();
