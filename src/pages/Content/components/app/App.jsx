import React from 'react';
var elt = document.createElement('script');
elt.innerHTML = 'window.foo = {bar:function(){/*whatever*/}};';
document.head.appendChild(elt);

function App() {
  return <div>Count: </div>;
}

export default App;
