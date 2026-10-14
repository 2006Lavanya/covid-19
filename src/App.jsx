
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API data fetch failed");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading COVID-19 Data...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>COVID-19 Tracker</h1>
      <p>Worldwide COVID-19 Statistics</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Cases</h3>
          <h2>{data.cases.toLocaleString()}</h2>
        </div>

        <div style={styles.card}>
          <h3>Total Deaths</h3>
          <h2>{data.deaths.toLocaleString()}</h2>
        </div>

        <div style={styles.card}>
          <h3>Recovered</h3>
          <h2>{data.recovered.toLocaleString()}</h2>
        </div>

        <div style={styles.card}>
          <h3>Active Cases</h3>
          <h2>{data.active.toLocaleString()}</h2>
        </div>

        <div style={styles.card}>
          <h3>Critical Cases</h3>
          <h2>{data.critical.toLocaleString()}</h2>
        </div>

        <div style={styles.card}>
          <h3>Total Tests</h3>
          <h2>{data.tests.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
