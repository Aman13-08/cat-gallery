import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCats = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/cats");
            setCats(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    return (
        <div>
            <h1>Cat Gallery</h1>
            <button onClick={fetchCats}>Load More</button>
            {loading && <p>Loading...</p>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {cats.map((cat) => (
                    <img key={cat.id} src={cat.url} alt="cat" style={{ width: "100%", borderRadius: "10px" }} />
                ))}
            </div>
        </div>
    );
}

export default App;
