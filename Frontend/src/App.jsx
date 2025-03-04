import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCats = async () => {
        setLoading(true);
        try {
            // ✅ Use Render backend API
            const response = await axios.get("https://cat-gallery-2.onrender.com/api/cats");
            setCats(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCats(); // Call API when component mounts
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
