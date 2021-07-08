import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/Header/Header'
import Home from '../pages/Home/Home'
import './css/App.css'

export default function App () {
    return (
        <div className="App">
            <Router basename={process.env.PUBLIC_URL}>
                <Header />
                <main>
                    <Switch>
                        <Route path="/city=:city?&country=:country?">
                            <Home />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </main>
            </Router>
        </div>
    )
}
