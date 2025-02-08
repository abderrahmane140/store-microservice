import Footer from "./components/footer";
import Header from "./components/header";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Header />
      
      {/* Main Content - Fills available space */}
      <main className="flex-1 flex items-center justify-center text-white">
        hello world
      </main>

      <Footer />
    </div>
  );
}

export default App;
