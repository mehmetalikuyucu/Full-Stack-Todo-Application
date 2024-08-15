
const SignIn: React.FC = () => {
  return (
    <form className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded"
      />
      <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
