import React from "react";
import {getCourses} from "./Utility";
import './App.css';

function App() {
    const [year, setYear] = React.useState(2024);
    const [term, setTerm] = React.useState("Winter");
    const [subject, setSubject] = React.useState("Computer Science");
    const [courses, setCourses] = React.useState(null);

    React.useEffect(() => {
        getCourses(year, term, subject)
            .then((data) => setCourses(data));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{!courses ? "Loading..." : courses["50"].courseName}</p>
            </header>
        </div>
    );
}

export default App;
