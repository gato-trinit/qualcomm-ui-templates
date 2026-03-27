import Store from "electron-store"

interface StoreSchema {
  theme: string
}

export const store = new Store<StoreSchema>({
  defaults: {
    theme: "dark",
  },
})
