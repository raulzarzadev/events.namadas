import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { createWrapper } from 'next-redux-wrapper'
import { counterSlice } from './slices/couterSlice'
import { eventSlice } from './slices/eventSlice'
import { eventFormSlice } from './slices/eventFormSlice'
import { geolocationSlice } from './slices/geolocationSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [counterSlice.name]: counterSlice.reducer,
      [eventSlice.name]: eventSlice.reducer,
      [eventFormSlice.name]: eventFormSlice.reducer,
      [geolocationSlice.name]: geolocationSlice.reducer
    },
    devTools: true
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)
