import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../context/AuthContext";
export default function LoginPage() {
  const { login } = useAuth();
  return <LoginForm onLogin={() => login("true")} />;
}
