import AppRoutes from "./routes/Approutes";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </>
  );
}
export default App;
