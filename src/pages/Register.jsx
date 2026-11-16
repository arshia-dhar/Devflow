
import { useState } from "react";
import api from "../api/client";

function Register() {
    const [form, setForm] = useState({
        name: "",
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
            const response = await api.post("/auth/register", form);
            setMessage(response.data.message);
            setForm({ name: "", email: "", password: "" });
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed."
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
                    fontSize: "32px",
                    lineHeight: "1.3",
                    marginBottom: "28px",
                    textAlign: "center",
                }}>
                    Create your DevFlow account
                </h1>

                <form onSubmit={handleSubmit} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                }}>
                    <input
                        name="name"
                        placeholder="Full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

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
                        placeholder="Password (minimum 8 characters)"
                        value={form.password}
                        onChange={handleChange}
                        minLength={8}
                        required
                        style={inputStyle}
                    />

                    <button type="submit" disabled={loading} style={{
                        padding: "12px",
                        background: "#6366f1",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}>
                        {loading ? "Creating account..." : "Register"}
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

export default Register;
