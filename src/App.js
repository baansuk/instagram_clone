import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout'
import Main from './pages/Main'
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import ScrollToTop from "./layout/ScrollToTop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <ScrollToTop/>
          <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:userId" element={<ProfilePage/>} />
          <Route path="/posts/:postId" element={<PostPage/>} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  );
}

export default App;
