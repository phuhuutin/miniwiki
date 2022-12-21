import "./App.css";
import { FooterComponent } from "./Components/FooterComponent";
import { Navbar } from "./Components/Navbar";
import { PostComponent } from "./Components/PostComponent";
import { SearchPostPage } from "./Components/SearchPostPage";

function App() {
  return (
    <div className='App flex flex-col h-screen justify-between'>
      <Navbar />
      {/* <PostComponent /> */}
      <SearchPostPage />
      <FooterComponent />
    </div>
  );
}

export default App;
