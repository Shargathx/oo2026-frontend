import { useState } from 'react'
import type { Person } from '../models/Person'

function Signup() {
    const [person, setPerson] = useState<Partial<Person>>({});

    const signUp = () => {
        fetch(import.meta.env.VITE_BACK_URL + "/signup", {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json", // seda automaatselt ei paku, tuleb manuaalselt kirjutada
            }
        }).then(res => res.json())
            .then(json => {
                if (json.message && json.timestamp && json.status) {
                    alert("Juhtus viga: " + json.message);
                    return;
                }
                alert("Registreerusid edukalt ID-ga: " + json.id);
                sessionStorage.setItem("token", json.id)
            });
    }

    return (
        <div>
            <label>First name</label> <br />
            <input onChange={(e) => setPerson({ ...person, firstName: e.target.value })} type="text" /> <br />
            <label >Last name</label> <br />
            <input onChange={(e) => setPerson({ ...person, lastName: e.target.value })} type="text" /> <br />
            <label>Email</label> <br />
            <input onChange={(e) => setPerson({ ...person, email: e.target.value })} type="text" /> <br />
            <label>Password</label> <br />
            <input onChange={(e) => setPerson({ ...person, password: e.target.value })} type="password" /> <br />
            <label>Personal code</label> <br />
            <input onChange={(e) => setPerson({ ...person, personalCode: e.target.value })} type="number" /> <br />

            {/* <br /> <br />
            <h3>Address:</h3>

            <label>Street</label>
            <input onChange={(e) => setPerson({...person, address: {...person.address, street: e.target.value}})} type="text" /> <br />
            <label>Street number</label>
            <input type="text" /> <br />
            <label>City</label>
            <input type="text" /> <br />
            <label>Country</label>
            <input type="text" /> <br />
            <label>Zip code</label>
            <input type="text" /> <br /> */}
            <button onClick={() => signUp()}>Sign up</button>
        </div>
    )
}

export default Signup