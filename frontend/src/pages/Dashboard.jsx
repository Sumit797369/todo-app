import Navbar from "../components/Navbar";

const Dashboard = ({ setIsLogin }) => {
  return (
    <div>

      <Navbar setIsLogin={setIsLogin} />

      <div className="p-8">
        <h2 className="text-2xl font-semibold">
          Your Tasks
        </h2>
      </div>

    </div>
  );
};

export default Dashboard;