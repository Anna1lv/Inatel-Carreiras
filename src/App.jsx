import Button from "./components/Button";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white">
      <Header titulo="Acadêmico" />
      <main className="p-6">
        <Button>Botão de teste</Button>
      </main>
    </div>
  );
}