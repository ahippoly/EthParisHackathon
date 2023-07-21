export enum EventTypes {}

declare global {
  interface IGlobalEvent {
    type: EventTypes
    payload?: unknown
  }
}
