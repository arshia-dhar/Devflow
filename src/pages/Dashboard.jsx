
import { useEffect, useState } from "react";
import api from "../api/client";

function Dashboard() {
    const [workspaces, setWorkspaces] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);

    const [loading, setLoading] = useState(true);
    const [projectsLoading, setProjectsLoading] = useState(false);
    const [error, setError] = useState("");
    const [projectError, setProjectError] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/workspaces")
            .then((response) => {
                setWorkspaces(response.data);

                if (response.data.length > 0) {
                    setSelectedWorkspace(response.data[0]);
                }
            })
            .catch(() => {
                setError("Failed to load workspaces.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!selectedWorkspace) {
            setProjects([]);
            return;
        }

        setProjectsLoading(true);
        setProjectError("");

        api.get("/projects", {
            params: { workspaceId: selectedWorkspace.id },
        })
            .then((response) => {
                setProjects(response.data);
            })
            .catch(() => {
                setProjectError("Failed to load projects.");
            })
            .finally(() => {
                setProjectsLoading(false);
            });
    }, [selectedWorkspace]);

    const handleCreateProject = async (event) => {
        event.preventDefault();

        if (!selectedWorkspace) return;

        setCreating(true);
        setProjectError("");
        setMessage("");

        try {
            const response = await api.post("/projects", {
                name: projectName,
                description: projectDescription,
                workspaceId: selectedWorkspace.id,
            });

            setProjects((previous) => [...previous, response.data]);
            setProjectName("");
            setProjectDescription("");
            setMessage("Project created successfully!");
        } catch (err) {
            setProjectError(
                err.response?.data?.message || "Failed to create project."
            );
        } finally {
            setCreating(false);
        }
    };

    const stats = [
        { label: "Total Issues", value: "24", change: "+4 this week" },
        { label: "In Progress", value: "08", change: "Currently active" },
        { label: "Completed", value: "12", change: "This month" },
        { label: "Overdue", value: "04", change: "Needs attention" },
    ];

    const tasks = [
        { title: "Design authentication flow", project: "DevFlow", status: "Done", priority: "High" },
        { title: "Implement JWT authentication", project: "Backend", status: "In Progress", priority: "High" },
        { title: "Build dashboard UI", project: "Frontend", status: "In Progress", priority: "Medium" },
        { title: "Set up PostgreSQL database", project: "Backend", status: "Done", priority: "High" },
        { title: "Create project management API", project: "Backend", status: "Todo", priority: "Medium" },
    ];

    const styles = {
        page: {
            minHeight: "100vh",
            background: "#0f172a",
            color: "#e2e8f0",
            fontFamily: "Arial, sans-serif",
            display: "flex",
        },
        sidebar: {
            width: "230px",
            padding: "28px 20px",
            background: "#111827",
            borderRight: "1px solid #263244",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
        },
        main: {
            flex: 1,
            padding: "40px",
            minWidth: 0,
        },
        card: {
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "10px",
            padding: "22px",
        },
        input: {
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            boxSizing: "border-box",
            background: "#0f172a",
            border: "1px solid #475569",
            borderRadius: "6px",
            color: "white",
        },
        button: {
            padding: "11px 16px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.page}>
            <aside style={styles.sidebar}>
                <h2 style={{ color: "#818cf8", marginBottom: "40px" }}>
                    DevFlow.
                </h2>

                <p style={{ color: "#64748b", fontSize: "12px" }}>
                    WORKSPACE
                </p>

                {["Overview", "Projects", "Issues", "Activity", "Settings"].map(item => (
                    <div
                        key={item}
                        style={{
                            padding: "12px",
                            margin: "6px 0",
                            borderRadius: "6px",
                            background: item === "Overview" ? "#312e81" : "transparent",
                            color: item === "Overview" ? "white" : "#94a3b8",
                            cursor: "pointer",
                        }}
                    >
                        {item}
                    </div>
                ))}

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    style={{
                        marginTop: "auto",
                        padding: "10px",
                        width: "100%",
                        background: "#334155",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </aside>

            <main style={styles.main}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "35px",
                }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: "30px", lineHeight: "1.4" }}>
                            Overview
                        </h1>

                        <p style={{ color: "#94a3b8", margin: "10px 0 0", fontSize: "14px" }}>
                            Here's what's happening in your workspace.
                        </p>
                    </div>

                    <span style={{ color: "#818cf8" }}>
                        Developer Workspace
                    </span>
                </div>

                <section style={{ marginBottom: "35px" }}>
                    <h2>My Workspaces</h2>

                    {loading && <p>Loading workspaces...</p>}
                    {error && <p style={{ color: "#f87171" }}>{error}</p>}

                    <div style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                    }}>
                        {workspaces.map((workspace) => (
                            <div
                                key={workspace.id}
                                onClick={() => setSelectedWorkspace(workspace)}
                                style={{
                                    ...styles.card,
                                    minWidth: "220px",
                                    maxWidth: "280px",
                                    cursor: "pointer",
                                    border: selectedWorkspace?.id === workspace.id
                                        ? "1px solid #818cf8"
                                        : "1px solid #334155",
                                }}
                            >
                                <h3 style={{ marginTop: 0 }}>
                                    {workspace.name}
                                </h3>

                                <p style={{ color: "#94a3b8" }}>
                                    {workspace.description}
                                </p>

                                <small style={{ color: "#818cf8" }}>
                                    {selectedWorkspace?.id === workspace.id
                                        ? "Selected"
                                        : "Click to select"}
                                </small>
                            </div>
                        ))}
                    </div>
                </section>

                {selectedWorkspace && (
                    <section style={{ ...styles.card, marginBottom: "35px" }}>
                        <h2 style={{ marginTop: 0 }}>
                            Projects — {selectedWorkspace.name}
                        </h2>

                        <form onSubmit={handleCreateProject}>
                            <input
                                style={styles.input}
                                placeholder="Project name"
                                value={projectName}
                                onChange={(event) => setProjectName(event.target.value)}
                                required
                                maxLength={100}
                            />

                            <input
                                style={styles.input}
                                placeholder="Project description"
                                value={projectDescription}
                                onChange={(event) => setProjectDescription(event.target.value)}
                                maxLength={500}
                            />

                            <button
                                type="submit"
                                style={styles.button}
                                disabled={creating}
                            >
                                {creating ? "Creating..." : "+ Create Project"}
                            </button>
                        </form>

                        {message && (
                            <p style={{ color: "#4ade80" }}>{message}</p>
                        )}

                        {projectError && (
                            <p style={{ color: "#f87171" }}>{projectError}</p>
                        )}

                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            marginTop: "25px",
                        }}>
                            {projectsLoading && <p>Loading projects...</p>}

                            {!projectsLoading && projects.length === 0 && (
                                <p style={{ color: "#94a3b8" }}>
                                    No projects yet. Create your first project!
                                </p>
                            )}

                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    style={{
                                        ...styles.card,
                                        minWidth: "200px",
                                        flex: "1 1 200px",
                                    }}
                                >
                                    <h3 style={{ marginTop: 0 }}>
                                        {project.name}
                                    </h3>

                                    <p style={{ color: "#94a3b8" }}>
                                        {project.description || "No description"}
                                    </p>

                                    <small style={{ color: "#64748b" }}>
                                        Project #{project.id}
                                    </small>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                    gap: "18px",
                    marginBottom: "35px",
                }}>
                    {stats.map(stat => (
                        <div key={stat.label} style={styles.card}>
                            <p style={{ color: "#94a3b8", margin: 0 }}>
                                {stat.label}
                            </p>

                            <h2 style={{ fontSize: "32px", margin: "15px 0" }}>
                                {stat.value}
                            </h2>

                            <small style={{ color: "#818cf8" }}>
                                {stat.change}
                            </small>
                        </div>
                    ))}
                </div>

                <section style={styles.card}>
                    <h2 style={{ marginTop: 0 }}>Recent Issues</h2>

                    <div style={{ overflowX: "auto" }}>
                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "left",
                        }}>
                            <thead>
                                <tr style={{ color: "#94a3b8" }}>
                                    {["Issue", "Project", "Status", "Priority"].map(header => (
                                        <th
                                            key={header}
                                            style={{
                                                padding: "14px 10px",
                                                borderBottom: "1px solid #334155",
                                            }}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={index}>
                                        <td style={cellStyle}>{task.title}</td>
                                        <td style={cellStyle}>{task.project}</td>

                                        <td style={cellStyle}>
                                            <span style={{
                                                color:
                                                    task.status === "Done" ? "#4ade80" :
                                                    task.status === "In Progress" ? "#818cf8" :
                                                    "#fbbf24",
                                            }}>
                                                {task.status}
                                            </span>
                                        </td>

                                        <td style={cellStyle}>{task.priority}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

const cellStyle = {
    padding: "16px 10px",
    borderBottom: "1px solid #334155",
    fontSize: "14px",
};

export default Dashboard;
