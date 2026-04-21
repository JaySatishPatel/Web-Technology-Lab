import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Employee Task Management System
      </h1>

      <AddEmployee />
      <EmployeeList />
      <TaskManager />
    </div>
  );
}

export default App;