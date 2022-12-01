import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '..'
import { Event } from '@firebase/Events/event.model'

export interface EventState {
  event: Event | null
}

const initialState: EventState = {
  event: null
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload
    }
  }
})

// Actions creators are generated for each case reducer funtion
export const { setEvent } = eventSlice.actions
export const selectEventState = (state: AppState) => state.event.event

export default eventSlice.reducer
