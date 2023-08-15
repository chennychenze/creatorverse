import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import { supabase } from "./client";
import "@picocss/pico";
import "./App.css";

function App() {
  const [contentCreators, setContentCreators] = useState([]);

  useEffect(() => {
    const fetchContentCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select("*");
        if (error) throw error;
        console.log("Fetched content creators:", data);
        setContentCreators(data);
      } catch (error) {
        console.error("Error fetching content creators:", error.message);
      }
    };

    fetchContentCreators();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ShowCreators contentCreators={contentCreators} />}
        />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/view/:creatorId" element={<ViewCreator />} />
        <Route path="/edit/:creatorId" element={<EditCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
