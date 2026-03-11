import { create } from "zustand";

type SyncStore = {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncAt: string | null;
  syncError: string | null;

  setOnlineStatus: (value: boolean) => void;
  setSyncing: (value: boolean) => void;
  setLastSyncAt: (value: string | null) => void;
  setSyncError: (value: string | null) => void;
  clearSyncError: () => void;
};

export const useSyncStore = create<SyncStore>((set) => ({
  isOnline: true,
  isSyncing: false,
  lastSyncAt: null,
  syncError: null,

  setOnlineStatus: (value) => set({ isOnline: value }),
  setSyncing: (value) => set({ isSyncing: value }),
  setLastSyncAt: (value) => set({ lastSyncAt: value }),
  setSyncError: (value) => set({ syncError: value }),
  clearSyncError: () => set({ syncError: null }),
}));
