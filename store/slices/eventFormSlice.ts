import { createSlice } from '@reduxjs/toolkit'
import { AppState } from '..'
import { Event } from '@firebase/Events/event.model'

export interface EventState {
  eventForm: Event | null
}

const initialState: EventState = {
  eventForm: null
}

export const eventFormSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    setEventForm: (state, action) => {
      state.eventForm = action.payload
    }
  }
})

// Actions creators are generated for each case reducer funtion
export const { setEventForm } = eventFormSlice.actions
export const selectEventFormState = (state: AppState) =>
  state.eventForm.eventForm

export default eventFormSlice.reducer
