import React from 'react';

const SignUp = () => {
  const formSubmit = () => console.log('form submitted');
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={formSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-center text-2xl font-bold text-[#FF7272] mb-4">
          Sign Up
        </h2>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-medium"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name..."
            name="username"
            // onChange={(event) => setUsername(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7272]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="LastName" className="block text-gray-700 font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name..."
            name="username"
            // onChange={(event) => setUsername(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7272]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username..."
            name="username"
            // onChange={(event) => setUsername(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7272]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password..."
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7272]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF7272] text-white font-semibold p-3 rounded-lg hover:bg-[#FF3737] transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
