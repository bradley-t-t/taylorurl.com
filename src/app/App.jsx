import {createRoot} from 'react-dom/client'
import './styles/Theme.css'
import './styles/index.css'
import './styles/App.css'
import HomeView from '../views/HomeView.jsx'

function App() {
    return <HomeView/>
}

const rootEl = document.getElementById('root')
if (rootEl) {
    if (!rootEl.__root) rootEl.__root = createRoot(rootEl);
    rootEl.__root.render(<App/>)
}

export default App