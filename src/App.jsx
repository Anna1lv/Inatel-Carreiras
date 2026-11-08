import { Route, Routes } from "react-router-dom";

const Teste = () => (
  <div className="min-h-screen bg-white dark:bg-black">
    <header className="bg-inatel-azul dark:bg-inatel-azul-escuro p-4 text-white">
      Avisos
    </header>
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Teste />} />
  </Routes>
);

export default App;