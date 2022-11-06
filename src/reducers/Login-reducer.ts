import {loginApi, LoginType, securityAPI} from '../api/API';
import {AppThunk} from './store';
import {setErrorApp, setStatusApp} from './App-reducer';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';



export type initialStateType = LoginType & forLoginUserInfo
export type forLoginUserInfo = {
    id: number
    isAuth: boolean
}
const initialState: initialStateType = {
    id: 0,
    isAuth: false,
    email: '',
    password: '',
    rememberMe: false,
    captcha: ''
}
export type LoginActionType = setAuthUserDataType | getCaptchaUrlSuccessType
const slice = createSlice({
    name:'login',
    initialState,
    reducers: {
        setAuthUserData(state,action:PayloadAction<{data: LoginType, userId: number, isAuth: boolean}>) {
            state.id = action.payload.userId
            state.isAuth = action.payload.isAuth
            state.email = action.payload.data.email
            state.password = action.payload.data.password
            state.rememberMe = action.payload.data.rememberMe
            state.captcha = action.payload.data.captcha
        },
        getCaptchaUrlSuccess(state,action:PayloadAction<{CaptchaUrl:string}>) {
            state.captcha = action.payload.CaptchaUrl
        },

    }
})

export const loginReducer = slice.reducer
export const {setAuthUserData,getCaptchaUrlSuccess} = slice.actions
export type setAuthUserDataType = ReturnType<typeof setAuthUserData>
export type getCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>



export const getCaptchaUrl = ():AppThunk =>
     async(dispatch:Dispatch) => {
        let response = await securityAPI.getCaptcha();
        let CaptchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess({CaptchaUrl}))
    }


export const updateLoginTC = (data: LoginType): AppThunk =>
    async (dispatch:Dispatch) => {
        dispatch(setStatusApp({status:'loading'}))
        try {
            const resp = await loginApi.login(data)
            if (resp.data.resultCode === 0) {
                dispatch(setAuthUserData({data, userId:resp.data.data.userId, isAuth:true}))
                dispatch(getCaptchaUrlSuccess({CaptchaUrl:''}))
                dispatch(setStatusApp({status:'succeeded'}))
            } else {
                dispatch(setErrorApp({error:resp.data.messages[0]}))
                dispatch(setStatusApp({status:'failed'}))
                dispatch(getCaptchaUrl() as any)
            }
        } catch (e: any) {
            dispatch(setErrorApp({error:e.message}))
        }
    }

export const removeLoginTC = (): AppThunk =>
    async (dispatch:Dispatch) => {
        dispatch(setStatusApp({status:'loading'}))
        try {
            const resp = await loginApi.logout()
            const data = {email: '', password: '', rememberMe: false}
            if (resp.resultCode === 0) {
                dispatch(setAuthUserData({data, userId:0, isAuth:false}))
                dispatch(setStatusApp({status:'succeeded'}))
            } else {
                dispatch(setErrorApp({error:resp.messages[0]}))
                dispatch(setStatusApp({status:'failed'}))
            }
        } catch (e: any) {
            dispatch(setErrorApp({error:e.message}))
        }
    }
