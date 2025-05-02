import { useState } from 'react'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store"

function App() {
  const [token, setToken] = useState(null)
  return (
    <Provider store={store}>
    <header>
      
    </header>
    <Router>
      <Routes>
        <Route path="/user/:userId" element={<SingleUser />}></Route>
      </Routes>

    </Router>
  </Provider>
  )
}

export default App
