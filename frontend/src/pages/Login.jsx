import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

      // Convert skills & causes from comma-separated string to an array
      const formattedData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        causes: formData.causes.split(",").map((cause) => cause.trim()),
      };

      const response = await axios.post(url, formattedData);
      console.log(response.data);
      if (response.data.message) {
        toast.success(response.data?.message);
      }

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
              />
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {!isLogin && (
              <>
                <Input
                  name="skills"
                  placeholder="Skills (comma separated)"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="causes"
                  placeholder="Causes (comma separated)"
                  value={formData.causes}
                  onChange={handleChange}
                  required
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
