import "./main.scss";
import { AuthProvider } from "./context/GlobalContext";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
