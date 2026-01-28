import { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import { BrowserRouter as Router } from 'react-router';

const store = ConfigureStore();

class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
  }

}

export default App;