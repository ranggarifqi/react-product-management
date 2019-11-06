import React from 'react';

const App = () => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  return <div>Hello</div>;
}

export default App;