
function Dashboard() {
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
                    <div key={item} style={{
                        padding: "12px",
                        margin: "6px 0",
                        borderRadius: "6px",
                        background: item === "Overview" ? "#312e81" : "transparent",
                        color: item === "Overview" ? "white" : "#94a3b8",
                        cursor: "pointer",
                    }}>
                        {item}
                    </div>
                ))}

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    style={{
                        marginTop: "50px",
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
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}>
                        <h1 style={{
                            margin: 0,
                            fontSize: "30px",
                            lineHeight: "1.4",
                        }}>
                            Overview
                        </h1>

                        <p style={{
                            color: "#94a3b8",
                            margin: 0,
                            fontSize: "14px",
                            lineHeight: "1.5",
                        }}>
                            Here's what's happening in your workspace.
                        </p>
                    </div>

                    <span style={{ color: "#818cf8" }}>
                        Developer Workspace
                    </span>
                </div>

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
                                        <th key={header} style={{
                                            padding: "14px 10px",
                                            borderBottom: "1px solid #334155",
                                        }}>
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
                                                color: task.status === "Done" ? "#4ade80" :
                                                    task.status === "In Progress" ? "#818cf8" : "#fbbf24",
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
