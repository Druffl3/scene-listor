import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/PageHeader';

function App() {
  return (
    <div className="App" style={{ padding:50, backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/588/1004/951/red-gray-minimalist-line-wallpaper-preview.jpg")` }}>
      <div style={{ backgroundColor:"white" }}>
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
