/// <reference types="vite/client" />

declare interface Window {
  loadlive2d: (id: string, modelJsonUrl: string) => void
}