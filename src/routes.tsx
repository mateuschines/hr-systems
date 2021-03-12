import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//browser router permite noss fazer navegacao ficam como barra
//switch garantir que penas uma rota seja chamada a cada momneto

import Listing from './pages/Listing'
import Form from './pages/Form'
import Details from './pages/Details'

//exact e para chamar quando a url for exatamente aquele endereco
const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Listing} />
                <Route path="/form" component={Form} />
                <Route path="/details" component={Details} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
