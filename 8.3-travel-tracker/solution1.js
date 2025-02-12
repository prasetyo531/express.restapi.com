import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Budi1992",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((c) => {
    countries.push(c.country_code);
  });
  console.log('function check visited '+countries);
  return countries;
}

// GET home page
app.get("/", async (_req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let country = [];
  result.rows.forEach((c) => {
    country.push(c.country_code);
  });
  console.log('get case '+result.rows);
  // res.redirect method sends a response to the client instructing it to redirect to a different URL
  // res.render method renders a template with the given data and sends the rendered HTML to the client
  // first key is always from ejs file
  res.render("index.ejs", { countries: country, total: country.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  //first try, catch error TypeError: Cannot read properties of undefined (reading 'country_code')
  try {
    console.log(input);
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name = $1",
      [input]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
