export type ErrorId = "FETCH_ROOMS_ERROR" | "FETCH_ROOM_DETAILS_ERROR" | "CREATE_ROOM_ERROR";

export interface ErrorState {
  id: ErrorId | null;
  message: string | null;
}
