import React, { Component, lazy, Profiler } from 'react';
import { Route, Switch } from "react-router-dom";

import "../styles/taskker.css";
import './App.css';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
// import AppSettings from './pages/AppSettings';

import settings from './settings.json';
import { SettingsContext } from './settings-context';

import { RawIntlProvider } from "react-intl";

import AppTheme from '../shared/theme/AppTheme';
import AppIntl from '../shared/locale';

import GalleryPage from './pages/GalleryPage';

// import { profile } from '../shared/core/profile';
{/* <Profiler id="App" onRender={profile}></Profiler> */ }
const AppSettings = lazy(() => import('./pages/AppSettings'));

class App extends Component {

  constructor() {
    super();

    // expect an object
    console.log('first settings...', settings);

    this.state = {
      intl: AppIntl.ro,
      settings: settings,
      updateSettings: this.updateSettings,
      updateIntl: this.updateIntl
    }

  }

  updateSettings = (updatedAppSettings = {}, updatedUserSettings = {}) => {
    console.log('run updateAppSettings...', updatedAppSettings, updatedUserSettings);
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        appSettings: {
          ...prevState.settings.appSettings,
          ...updatedAppSettings
        },
        userSettings: {
          ...prevState.settings.userSettings,
          ...updatedUserSettings
        }
      }
    }))
  }

  updateIntl = (locale = 'en') => {
    this.setState(() => ({ intl: AppIntl[locale] }))
  }

  render() {
    return (

      <RawIntlProvider value={this.state.intl} id={this.state.intl.locale}>
        <AppTheme>
          <SettingsContext.Provider value={this.state}>
            <Switch>
              <Route>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/app-settings" component={AppSettings} />
                <Route exact path="/gallery" component={GalleryPage} />
              </Route>
            </Switch>

          </SettingsContext.Provider>
        </AppTheme>
      </RawIntlProvider>
    );
  }
}

export default App;
