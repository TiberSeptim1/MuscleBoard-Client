import supabase from "../supabaseClient";

const Top = ({ searchTerm, setSearchTerm }) => {
  const logout = () => {
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
      supabase.auth.signOut();
    }
  };

  return (
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
  );
};

export default Top;