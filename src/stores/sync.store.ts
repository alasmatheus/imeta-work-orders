import { create } from "zustand";

type SyncStore = {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncAt: string | null;
  syncError: string | null;

  setOnlineStatus: (value: boolean) => void;
  setLastSyncAt: (value: string | null) => void;
  clearSyncError: () => void;
  syncNow: () => Promise<void>;
};

export const useSyncStore = create<SyncStore>((set) => ({
  isOnline: true,
  isSyncing: false,
  lastSyncAt: null,
  syncError: null,

  setOnlineStatus: (value) => {
    set({ isOnline: value });
  },

  setLastSyncAt: (value) => {
    set({ lastSyncAt: value });
  },

  clearSyncError: () => {
    set({ syncError: null });
  },

  syncNow: async () => {
    try {
      set({ isSyncing: true, syncError: null });

      set({
        isSyncing: false,
        lastSyncAt: new Date().toISOString(),
      });
    } catch (error) {
      set({
        isSyncing: false,
        syncError: "Erro ao sincronizar ordens de serviço.",
      });
    }
  },
}));
