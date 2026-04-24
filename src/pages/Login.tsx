import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginCredentials, setLoginCredentials] = useState<{ email: string, password: string }>({
    email: "", password: ""
  });

  const navigate = useNavigate();
  const login = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/signup", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: {
        "Content-Type": "application/json", // seda automaatselt ei paku, tuleb manuaalselt kirjutada
      }
    }).then(res => res.json())
      .then(json => {
        if (json.message && json.timestamp && json.status) {
          alert("Juhtus viga: " + json.message);
          return;
        }
        sessionStorage.setItem("token", json.id)
        navigate("/profile");
      });
  }

  return (
    <div>
      <label>Email</label> <br />
      <input onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })} type="text" /> <br />
      <label>Password</label> <br />
      <input onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })} type="password" /> <br />
      <button onClick={() => login()}></button>
    </div>
  )
}

export default Login