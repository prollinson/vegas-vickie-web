import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Vegas Vickie NFT - Redirecting to https://www.circalasvegas.com/vegas-vickie-nft/
      </header>
      <Redirect />
    </div>
  );
}

function Redirect() {
  window.location.replace('https://www.circalasvegas.com/vegas-vickie-nft/');

  return null;
}

export default App;
