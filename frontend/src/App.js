import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'contexts/UserContext'
import AllRoutes from './views/routes'
import { Provider } from 'react-redux'
import store from 'redux/store'


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Provider store={store}>
                        <AllRoutes />
                </Provider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
