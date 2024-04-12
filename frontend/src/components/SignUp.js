import { React } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function saveData(e) {
    e.preventDefault();
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result));
    // localStorage.setItem("token", JSON.stringify(result.auth));

    if (result) {
      navigate("/");
    }
  }

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form className="form">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit" onClick={saveData}>
          Sign up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
