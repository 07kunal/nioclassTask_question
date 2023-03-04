import Header from "./component/Header";
import Questions from "./questions/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="main-app">

      <Header />

      <div className="sub_main-app">


        <Questions />


      </div>
    </div>
  );
}

export default App;
