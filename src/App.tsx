import "./App.css";
import { FooterComponent } from "./Components/FooterComponent";
import { Navbar } from "./Components/Navbar";
import { PostComponent } from "./Components/PostComponent";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <PostComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
