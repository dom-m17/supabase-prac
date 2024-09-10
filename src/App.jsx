import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://wayjxzeazxkexkdepytb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndheWp4emVhenhrZXhrZGVweXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NjUxMDksImV4cCI6MjA0MTU0MTEwOX0.Tuk5rgWsHMAhrgONpjeKLulX3uABUCbedFxjR-yW5Gk");

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;