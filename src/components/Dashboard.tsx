const Dashboard = () => {
  return (
    <div>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          color: "#000000",
          marginBottom: "1rem",
          margin: "0 0 1rem 0",
        }}
      >
        Bienvenido al Dashboard
      </h2>
      <p style={{ color: "#000000", fontSize: "1rem", lineHeight: "1.6", margin: 0 }}>
        Has iniciado sesión correctamente. Este es el contenido principal del
        dashboard.
      </p>
    </div>
  );
};

export default Dashboard;

