import { useEffect, useState } from 'react'
import type { Person } from '../models/Person'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [person, setPerson] = useState<Person>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        personalCode: "",
        address: {
            street: "",
            city: "",
            number: "",
            country: "",
            zipcode: ""
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("token") === null) {
            navigate("/login");
            return;
        }

        fetch(import.meta.env.VITE_BACK_URL + "/profile?id=" + sessionStorage.getItem("token"))
            .then(res => res.json())
            .then(json => {
                if (json.message && json.timestamp && json.status) {
                    alert("Juhtus viga: " + json.message);
                    return;
                }
                setPerson(json);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProfile = () => {
        fetch(import.meta.env.VITE_BACK_URL + "/profile", {
            method: "PUT",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json" // seda automaatselt ei paku, tuleb manuaalselt kirjutada
            }
        }).then(res => res.json())
            .then(json => {
                if (json.message && json.timestamp && json.status) {
                    alert("Juhtus viga: " + json.message);
                    return;
                }
                alert("Profiil uuendatud!");
            });
    }


    if (person.id === undefined) {
        console.log("Enne");
        return <div>Loading...</div>
    }

    return (
        <div>
            console.log("error peale returni");
            <label>First name</label> <br />
            <input value={person.firstName ?? ""} onChange={(e) => setPerson({ ...person, firstName: e.target.value })} type="text" /> <br />
            <label >Last name</label> <br />
            <input value={person.lastName ?? ""} onChange={(e) => setPerson({ ...person, lastName: e.target.value })} type="text" /> <br />
            <label>Email</label> <br />
            <input value={person.email} onChange={(e) => setPerson({ ...person, email: e.target.value })} type="text" /> <br />
            <label>Password</label> <br />
            <input value={person.password} onChange={(e) => setPerson({ ...person, password: e.target.value })} type="password" /> <br />
            <label>Personal code</label> <br />
            <input value={person.personalCode} onChange={(e) => setPerson({ ...person, personalCode: e.target.value })} type="number" /> <br />

            <br /><br /><br />
            <h3>Address:</h3>

            <label>Street</label> <br />
            <input value={person.address?.street ?? ""} onChange={(e) => setPerson({ ...person, address: { ...person.address, street: e.target.value } })} type="text" /> <br />
            <label>Street number</label> <br />
            <input value={person.address?.number ?? ""} onChange={(e) => setPerson({ ...person, address: { ...person.address, number: e.target.value } })} type="text" /> <br />
            <label>City</label> <br />
            <input value={person.address?.city ?? ""} onChange={(e) => setPerson({ ...person, address: { ...person.address, city: e.target.value } })} type="text" /> <br />
            <label>Country</label> <br />
            <input value={person.address?.country ?? ""} onChange={(e) => setPerson({ ...person, address: { ...person.address, country: e.target.value } })} type="text" /> <br />
            <label>Zip code</label> <br />
            <input value={person.address?.zipcode ?? ""} onChange={(e) => setPerson({ ...person, address: { ...person.address, zipcode: e.target.value } })} type="text" /> <br />
            <button onClick={() => updateProfile()}>Update</button>
        </div>
    )
}

export default Profile