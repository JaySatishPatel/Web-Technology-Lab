function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Employees</div>
        <div className="bg-white p-4 rounded shadow">Tasks</div>
        <div className="bg-white p-4 rounded shadow">Reports</div>
      </div>
    </div>
  );
}

export default Dashboard;