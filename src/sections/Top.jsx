import supabase from "../supabaseClient";
import { Link } from "react-router-dom";

const Top = ({ searchTerm, setSearchTerm }) => {
  const logout = () => {
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
      supabase.auth.signOut();
    }
  };

  return (
    <div>
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 px-6 py-6 mb-10">
      <div className="relative w-full md:w-96">
        <img
          src="/search.svg"
          alt="Search Icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-70 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search members"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500 transition"
        />
      </div>
      <button
        className="bg-slate-700 px-2 py-2 border border-gray-800 rounded-lg text-red-600 hover:text-red-700 font-medium transition-transform hover:scale-110"
        onClick={logout}
      >
        Logout
      </button>
    </div>

<div className='flex justify-center items-center font-poppins'>
<div className="flex flex-col gap-3 mb-3 md:gap-4 md:mb-6 md:flex-row text-sm md:text-base w-fit">
  <Link to='/members/create'>
<button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex flex-auto gap-3 items-center justify-center">
    <img src="/add.svg" alt="add" className='w-6 h-6'/>
  Add New Member
</button>
  </Link>
</div>
</div>

</div>
  );
};

export default Top;