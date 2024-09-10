import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


const supabase = createClient("https://wayjxzeazxkexkdepytb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndheWp4emVhenhrZXhrZGVweXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NjUxMDksImV4cCI6MjA0MTU0MTEwOX0.Tuk5rgWsHMAhrgONpjeKLulX3uABUCbedFxjR-yW5Gk");

// function App() {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     getCountries();
//   }, []);

//   async function getCountries() {
//     const { data } = await supabase.from("countries").select();
//     setCountries(data);
//   }

//   return (
//     <ul>
//       {countries.map((country) => (
//         <li key={country.name}>{country.name}</li>
//       ))}
//     </ul>
//   );
// }

// export default App;


export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div>Logged in!</div>)
  }
};