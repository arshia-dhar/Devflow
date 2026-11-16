
import { useState } from "react";
import api from "../api/client";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/auth/login", form);

            localStorage.setItem("token", response.data.token);

            setMessage("Login successful!");
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#111827",
            color: "white",
            fontFamily: "Arial, sans-serif",
        }}>
            <div style={{ width: "360px" }}>
                <h1 style={{
                    textAlign: "center",
                    fontSize: "30px",
                    lineHeight: "1.4",
                    marginBottom: "28px",
                    letterSpacing: "normal",
                }}>
                    Welcome to DevFlow
                </h1>

                <form onSubmit={handleSubmit} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                }}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <button type="submit" disabled={loading} style={{
                        padding: "12px",
                        background: "#6366f1",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

const inputStyle = {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #374151",
    background: "#1f2937",
    color: "white",
    fontSize: "15px",
};

export default Login;
