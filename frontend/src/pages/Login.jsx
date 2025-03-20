import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    causes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // ✅ Use Auth Context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const formattedData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        causes: formData.causes.split(",").map((cause) => cause.trim()),
      };

      const response = await axios.post(url, formattedData);

      toast.success(response.data?.message || "Success!");

      if (response.data?.token) {
        loginUser(response.data.token); // ✅ Update Auth Context
        navigate("/");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-gray-100">
      <h1 className="text-lg md:text-2xl font-semibold text-gray-600 text-center">Join HandsOn – Empower Communities Through Volunteering!</h1>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            {!isLogin && (
              <>
                <Input
                  name="skills"
                  placeholder="Skills (comma separated)"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <Input
                  name="causes"
                  placeholder="Causes (comma separated)"
                  value={formData.causes}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
