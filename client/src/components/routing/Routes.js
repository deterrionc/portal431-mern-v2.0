import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Register from '../auth/Register'
import AfterRegister from '../layout/AfterRegister'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'

const Routes = () => {
  return (
    <>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/after-register" component={AfterRegister} />
        <Route exact path="/login" component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default Routes
