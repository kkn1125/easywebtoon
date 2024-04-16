import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";
import path from "path";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  dotenv.config({
    path: path.join(path.resolve(), ".env"),
  });

  const MODE = process.env.NODE_ENV || "production";
  const HOST = process.env.HOST;
  const PORT = +(process.env.PORT || 5000);

  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host: HOST,
      port: PORT,
    },
    base: MODE === "production" ? "/anitoon" : "/",
  };
});

// [intro]
// [interlude]

// [verse]
// Whenever I gaze upon the night sky, searching for constellations
// It feels like each star finds its rhythm, dancing across the cosmos in silent celebration
// Their luminous figures sketching stories in the dark
// A celestial ballet, where every flicker is a spark

// [verse]
// Under this vast canvas, where constellations sway and twirl
// They seem to whisper tales of ancient light, in a graceful swirl
// Guiding us through the night with their radiant choreography
// In this boundless auditorium, they perform, free and majestically

// [chorus]
// In the quiet of the night, under the watchful eye of the sky
// Every star's dance tells a tale, etched in the vault of heaven high
// A symphony of light, in the silent expanse, they gleam
// In the theater of the night, we find our dreams

// [verse]
// As I trace the arcs of constellations, a map unfolds in the sky
// A guide through epochs and legends, where heroes and beasts lie
// Orion draws his bow, while Ursa takes her gentle stride
// In this cosmic dance, they move with such pride

// [verse]
// The zodiac spins, a wheel of fortune and fate
// Each sign marking time in its celestial state
// Virgo bestows her grace, as Leo roars his might
// In the orchestra of stars, they shine ever so bright

// [chorus]
// As the night whispers secrets, held in the stars' embrace
// Constellations come alive, each in its rightful place
// With every twinkle, they compose the universe's rhyme
// In this endless dance, we're lost in time

// [interlude]
// [end]
