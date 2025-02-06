import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Login error:", error);
    return 'null';
  }
};



export { login };
