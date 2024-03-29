import { Route, Routes } from "react-router-dom";
import "./App.css";
import { FooterComponent } from "./Components/FooterComponent";
import { Navbar } from "./Components/Navbar";
import { PostComponent } from "./Components/PostComponent";
import { SearchPostPage } from "./Components/SearchPostPage";
import { SinglePostPage } from "./Components/SinglePostPage";
import { WikiLogin } from "./Components/WikiLogin";
import { AuthProvider } from "./Contexts/AuthContext";

export const App = () => {

  return (
    <>
      <div className='App flex flex-col h-screen justify-between'>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<PostComponent />} />

            <Route path='/home' element={<PostComponent />} />

            <Route path='/browse' element={<SearchPostPage />} />

            <Route path='/post/:postId' element={<SinglePostPage />} />

            <Route path='/login' element={<WikiLogin />} />
          </Routes>
          <FooterComponent />
        </AuthProvider>
      </div>
    </>
  );
};
