const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Serve sign images from /signs folder
app.use('/signs', express.static(__dirname + '/signs'));

// ------------------------------
// 📌 ENGLISH → KANNADA DICTIONARY
// ------------------------------
const dictionary = {
  "hello": "ಹಲೋ",
  "thank you": "ಧನ್ಯವಾದಗಳು",
  "good morning": "ಶುಭೋದಯ",
  "good night": "ಶುಭ ರಾತ್ರಿ",
  "how are you": "ನೀವು ಹೇಗಿದ್ದೀರಿ",
  "sorry": "ಕ್ಷಮಿಸಿ",
  "yes": "ಹೌದು",
  "no": "ಇಲ್ಲ",
  "please": "ದಯವಿಟ್ಟು",
  "water": "ನೀರು",
  "mother": "ತಾಯಿ",
  "father": "ತಂದೆ",

  "i love you": "ನಾನು ನಿನ್ನ ಪ್ರೀತಿಸುತ್ತೇನೆ",
  "i am dhanush": "ನಾನು ಧನುಷ್",
  "i love to eat chicken": "ನನಗೆ ಕೋಳಿ ಮಾಂಸ ತಿನ್ನಲು ಇಷ್ಟ",
  "where are you from": "ನೀವು ಎಲ್ಲಿಂದ ಬಂದವರು",
  "what is your name": "ನಿಮ್ಮ ಹೆಸರೇನು",

  // 🔢 Numbers 1–9
  "1": "ಒಂದು",
  "2": "ಎರಡು",
  "3": "ಮೂರು",
  "4": "ನಾಲ್ಕು",
  "5": "ಐದು",
  "6": "ಆರು",
  "7": "ಏಳು",
  "8": "ಎಂಟು",
  "9": "ಒಂಬತ್ತು",

  // 🔤 Sentences
  "how are you": "ನೀವು ಹೇಗಿದ್ದೀರಿ",
  "i love watching movies": "ನನಗೆ ಸಿನಿಮಾ ನೋಡುವುದು ತುಂಬಾ ಇಷ್ಟ",
  "i am feeling sad": "ನನಗೆ ಬೇಸರವಾಗುತ್ತಿದೆ",
  "where is the hospital": "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ",
  "i dont have money": "ನನ್ನ ಬಳಿ ಹಣವಿಲ್ಲ",
  "tomorrow i will go to school with my friend": "ನಾಳೆ ನಾನು ನನ್ನ ಸ್ನೇಹಿತನೊಂದಿಗೆ ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ",
  "it is raining heavily so take an umbrella": "ಜೋರಾಗಿ ಮಳೆ ಬರುತ್ತಿದೆ, ಆದ್ದರಿಂದ ಛತ್ರಿ ತೆಗೆದುಕೊಳ್ಳಿ",
  "i have not eaten anything since morning": "ನಾನು ಬೆಳಿಗ್ಗೆಯಿಂದ ಏನನ್ನೂ ತಿಂದಿಲ್ಲ",
  "i am happy because you helped me": "ನೀವು ನನಗೆ ಸಹಾಯ ಮಾಡಿದ್ದರಿಂದ ನನಗೆ ಸಂತೋಷವಾಗಿದೆ",
  "we are going to visit our relatives this weekend": "ಈ ವಾರಾಂತ್ಯದಲ್ಲಿ ನಾವು ನಮ್ಮ ಸಂಬಂಧಿಕರನ್ನು ಭೇಟಿ ಮಾಡಲಿದ್ದೇವೆ",
  "i want to learn new things every day": "ನಾನು ಪ್ರತಿದಿನ ಹೊಸ ವಿಷಯಗಳನ್ನು ಕಲಿಯಲು ಬಯಸುತ್ತೇನೆ",
  "my mother is cooking food in the kitchen": "ನನ್ನ ತಾಯಿ ಅಡುಗೆಮನೆಯಲ್ಲಿ ಅಡುಗೆ ಮಾಡುತ್ತಿದ್ದಾರೆ"
};

// ------------------------------
// 📌 SIGN IMAGE MAPPING
// ------------------------------
const signImages = {
  // Basic words
  "hello": "hello.png",
  "thank you": "thank_you.png",
  "i love you": "i_love_you.png",
  "i am dhanush": "i_am_dhanush.png",
  "i love to eat chicken": "i_love_to_eat_chicken.png",
  "water": "water.png",

  // 🔤 Alphabets
  "a":"a.png","b":"b.png","c":"c.png","d":"d.png","e":"e.png",
  "f":"f.png","g":"g.png","h":"h.png","i":"i.png","j":"j.png",
  "k":"k.png","l":"l.png","m":"m.png","n":"n.png","o":"o.png",
  "p":"p.png","q":"q.png","r":"r.png","s":"s.png","t":"t.png",
  "u":"u.png","v":"v.png","w":"w.png","x":"x.png","y":"y.png",
  "z":"z.png",

  // 🔢 Numbers (add 1.png to 9.png)
  "1": "1.jpg",
  "2": "2.jpg",
  "3": "3.jpg",
  "4": "4.jpg",
  "5": "5.jpg",
  "6": "6.jpg",
  "7": "7.jpg",
  "8": "8.jpg",
  "9": "9.jpg",

  // Sentences
  "how are you": "how_are_you.png",
  "i love watching movies": "i_love_watching_movies.jpg",
  "where are you from": "where_are_you_from.png",
  "what is your name": "what_is_your_name.png",
  "i am feeling sad": "i_am_feeling_sad.png",
  "where is the hospital": "where_is_the_hospital.jpg",
  "i dont have money": "i_dont_have_money.png",
  "tomorrow i will go to school with my friend": "tomorrow_i_will_go_to_school_with_my_friend.png",
  "it is raining heavily so take an umbrella": "it_is_raining_heavily_so_take_an_umbrella.png",
  "i have not eaten anything since morning": "i_have_not_eaten_anything_since_morning.png",
  "i am happy because you helped me": "i_am_happy_because_you_helped_me.png",
  "we are going to visit our relatives this weekend": "we_are_going_to_visit_our_relatives_this_weekend.png",
  "i want to learn new things every day": "i_want_to_learn_new_things_every_day.png",
  "my mother is cooking food in the kitchen": "my_mother_is_cooking_food_in_the_kitchen.png"
};

// ------------------------------
// 📌 INPUT NORMALIZER
// ------------------------------
function normalize(text) {
  return text ? text.normalize("NFC").trim().toLowerCase() : "";
}

// ------------------------------
// 📌 POST /translate
// ------------------------------
app.post('/translate', (req, res) => {
  const raw = req.body.text || "";
  const mode = req.body.mode || "en-kn";   // "en-kn" or "kn-en"
  const input = normalize(raw);

  let translation = "Translation not found";

  if (mode === "en-kn") {
    translation = dictionary[input] || "Translation not found";
  } else {
    // Kannada -> English
    const found = Object.entries(dictionary).find(([en, kn]) => normalize(kn) === input);
    translation = found ? found[0] : "Translation not found";
  }

  // Choose image key (always English text)
  const key = mode === "en-kn" ? input : translation.toLowerCase();
  const signImage = signImages[key] || null;

  res.json({ translation, signImage });
});

// ------------------------------
// 🚀 START SERVER
// ------------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});
