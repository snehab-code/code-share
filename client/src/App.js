import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

function App() {
  return (
    <BrowserRouter>
    <CssBaseline />
      <div className="App">
          <h1>Code</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
