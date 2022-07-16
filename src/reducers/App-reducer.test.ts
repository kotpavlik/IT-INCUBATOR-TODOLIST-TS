import {appInitialStateType, appReducer, setErrorApp, setStatusApp} from './App-reducer';

let initialSateApp:appInitialStateType ;

beforeEach(()=>{
    initialSateApp = {
        status:'idle',
        error: 'error message'
    }
})

test('correct error message', () => {
const endState = appReducer(initialSateApp,setErrorApp('some error'))

    expect(endState.error).toBe('some error')
})

test('correct status changing', () => {
    const endState = appReducer(initialSateApp,setStatusApp('failed'))

    expect(endState.status).toBe('failed')
})
