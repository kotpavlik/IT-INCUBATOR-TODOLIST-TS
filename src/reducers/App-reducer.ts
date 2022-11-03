import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type requestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type appInitialStateType = {
    status: requestStatusType
    error: string | null
}
const InitialState:appInitialStateType = {
    status: 'idle',
    error: null
}

// This is Redux toolkit with slice and setErrorApp this little reducer and Action creator. Default case auto
 const slice = createSlice({
    name: 'app',
    initialState: InitialState,
    reducers: {
        setErrorApp(state,action:PayloadAction<{ error:string | null }>) {
             state.error = action.payload.error
        },
        setStatusApp(state,action:PayloadAction<{ status: requestStatusType }>) {
             state.status = action.payload.status
        }
    }

})
export const appReducer = slice.reducer;
export const {setErrorApp,setStatusApp} = slice.actions

// this flow need for using Redux
// export const appReducer = (state = InitialState,action:appReducersType):appInitialStateType => {
//     switch(action.type) {
//         case 'APP/SET_ERROR': {
//             return {...state,error:action.error}
//         }
//         case 'APP/SET_STATUS' : {
//             return {...state,status:action.status}
//         }
//         default:
//             return {...state}
//     }
// }
// We dont need action creator and all action creators type in Redux toolkit
export type appReducersType = setErrorType | setStatusType
type setErrorType =  ReturnType<typeof setErrorApp>
// export const setErrorApp = (error:string | null) => {
//     return {
//         type : 'APP/SET_ERROR',
//         error
//     } as const
// }
export type setStatusType = ReturnType<typeof setStatusApp>
// export const setStatusApp = (status:requestStatusType) => {
//     return {
//         type : 'APP/SET_STATUS',
//         status
//     } as const
// }
