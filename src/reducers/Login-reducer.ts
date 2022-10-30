import {loginApi, LoginType, securityAPI} from '../api/API';
import {AppDispatch, AppThunk} from './store';
import {setErrorApp, setStatusApp} from './App-reducer';

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
export type LoginActionType = setAuthUserACType | getCaptchaUrlSuccessType

export const loginReducer = (state: initialStateType = initialState, action: LoginActionType): initialStateType => {
    switch (action.type) {
        case 'SET_AUTH_USER': {
            return {
                ...state,
                id: action.payload.userId,
                isAuth: action.payload.isAuth,
                email: action.payload.data.email,
                password: action.payload.data.password,
                rememberMe: action.payload.data.rememberMe,
                captcha: action.payload.data.captcha
            }
        }
        case 'GET_CAPTCHA_URL': {
            return {...state,captcha:action.payload.CaptchaUrl}
        }
        default:
            return state;
    }
}

export type setAuthUserACType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (data: LoginType, userId: number, isAuth: boolean) => {
    return {
        type: 'SET_AUTH_USER',
        payload: {
            data,
            userId,
            isAuth
        }
    } as const
}

type getCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>
export const getCaptchaUrlSuccess = (CaptchaUrl:string) => {
    return {
        type: 'GET_CAPTCHA_URL',
        payload: {
            CaptchaUrl
        }
    } as const
}


export const getCaptchaUrl = ():AppThunk => {
    return async(dispatch:AppDispatch) => {
        let response = await securityAPI.getCaptcha();
        let CaptchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(CaptchaUrl))
    }
}

export const updateLoginTC = (data: LoginType): AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp('loading'))
        try {
            const resp = await loginApi.login(data)
            if (resp.data.resultCode === 0) {
                dispatch(setAuthUserData(data, resp.data.data.userId, true))
                dispatch(getCaptchaUrlSuccess(''))
                dispatch(setStatusApp('succeeded'))
            } else {
                dispatch(setErrorApp(resp.data.messages[0]))
                dispatch(setStatusApp('failed'))
                dispatch(getCaptchaUrl())
            }
        } catch (e: any) {
            dispatch(setErrorApp(e.message))
        }
    }

export const removeLoginTC = (): AppThunk =>
    async (dispatch) => {
        dispatch(setStatusApp('loading'))
        try {
            const resp = await loginApi.logout()
            if (resp.resultCode === 0) {
                dispatch(setAuthUserData({email: '', password: '', rememberMe: false}, 0, false))
                dispatch(setStatusApp('succeeded'))
            } else {
                dispatch(setErrorApp(resp.messages[0]))
                dispatch(setStatusApp('failed'))
            }
        } catch (e: any) {
            dispatch(setErrorApp(e.message))
        }
    }