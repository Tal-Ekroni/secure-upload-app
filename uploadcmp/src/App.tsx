import React, { useEffect } from "react";
import UploadFile from "./cmps/UploadFile";


const App: React.FC = () => {



  useEffect(() => {
  }, []);



  return (
    <div className="App">
      <header className="app-header">
        Request your loan man
      </header>
      <main>
        <UploadFile />
      </main>


    </div>
  );
};

export default App;
