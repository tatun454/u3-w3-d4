import { Provider } from "react-redux";
import { store } from "./store";
import ReduxExample from "./components/ReduxExample";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ReduxExample />
      </div>
    </Provider>
  );
}

export default App;
