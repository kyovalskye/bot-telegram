const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const TELEGRAM_BOT_TOKEN = "7759671076:AAFyZr9791Uzw4GKP1ohyWVu5bpuc-VNGvY";
const GEMINI_API_KEY = "AIzaSyDTzWoI8I-vWMrV29WmZr9kMKeK3r2hyEQ";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Objek untuk menyimpan tes pengguna
const userTests = {};

// Daftar kata acak dalam bahasa Indonesia
const kataAcak = [
  "makan",
  "minum",
  "lari",
  "tidur",
  "baca",
  "tulis",
  "main",
  "nyanyi",
  "dengar",
  "lihat",
  "pikir",
  "belajar",
  "kerja",
  "jalan",
  "renang",
  "masak",
  "bersih",
  "gambar",
  "hitung",
  "jual",
  "beli",
  "pakai",
  "buka",
  "tutup",
  "angkat",
  "tarik",
  "dorong",
  "lempar",
  "tangkap",
  "cium",
  "sentuh",
  "rasa",
  "cium",
  "lompat",
  "terbang",
  "berenang",
  "berlari",
  "berjalan",
  "berbicara",
  "berpikir",
];

// Fungsi untuk memilih 5 kata acak dari daftar
function getRandomWords() {
  const shuffled = kataAcak.sort(() => 0.5 - Math.random()); // Acak daftar kata
  return shuffled.slice(0, 5).join(" "); // Ambil 5 kata pertama dan gabungkan menjadi kalimat
}

bot.getMe().then((botInfo) => {
  bot.botInfo = botInfo;
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text?.toLowerCase();

  if (userMessage === "/mlampah") {
    bot.sendMessage(chatId, "Hai, Tad Ai siap membantu.");
    return;
  }

  if (userMessage === "/testwpm") {
    // Buat tes mengetik dengan 5 kata acak
    const testText = getRandomWords();
    userTests[chatId] = { text: testText, startTime: Date.now() }; // Simpan teks dan waktu mulai (dalam milidetik)
    bot.sendMessage(
      chatId,
      `Tes mengetik:\n\n${testText}\n\nBalas pesan ini dengan mengetik teks di atas secepat mungkin!`
    );
    return;
  }

  // Jika pengguna membalas pesan tes mengetik
  if (msg.reply_to_message && userTests[chatId]) {
    const { text: originalText, startTime } = userTests[chatId];
    const endTime = Date.now(); // Waktu selesai dalam milidetik
    const timeTaken = (endTime - startTime) / 1000 / 60; // Waktu dalam menit

    const typedText = msg.text;

    if (typedText === originalText) {
      const wordCount = originalText.split(" ").length;
      const wpm = Math.round(wordCount / timeTaken);

      bot.sendMessage(
        chatId,
        `Selamat! Kecepatan mengetik Anda adalah ${wpm} WPM.`
      );
    } else {
      bot.sendMessage(chatId, "Teks yang Anda ketik tidak sesuai. Coba lagi!");
    }

    delete userTests[chatId]; 
    return;
  }

  if (
    userMessage?.includes("siapa pembuat tad ai") ||
    userMessage?.includes("siapa pencipta tad ai")
  ) {
    bot.sendMessage(chatId, "Tad Ai diciptakan oleh PT Universal Big Data.");
    return;
  }
  if (
    userMessage?.includes("siapa band favorit samid") ||
    userMessage?.includes("siapa band favorit samit") ||
    userMessage?.includes("siapa band favorit samidi") ||
    userMessage?.includes("siapa band favorit dimasukin") ||
    userMessage?.includes("siapa band favorit dimas")
  ) {
    bot.sendMessage(chatId, "Band favorit dimas adalah Arctic Monkeys.");
    return;
  }
  if (userMessage?.includes("legenda fauzan")) {
    bot.sendMessage(chatId, "Aku tidak berani😥");
    return;
  }
  if (
    userMessage?.includes("jodoh tito") ||
    userMessage?.includes("jodoh bang tito") ||
    userMessage?.includes("siapa jodoh bang tito")
  ) {
    bot.sendMessage(chatId, "Mungkin jodohnya adalah Marbot ASA");
    return;
  }

  if (
    userMessage?.includes("siapa istri dimas") ||
    userMessage?.includes("siapa isteri dimas") ||
    userMessage?.includes("siapa isteri samid") ||
    userMessage?.includes("siapa istri samid") ||
    userMessage?.includes("siapa isteri samidi") ||
    userMessage?.includes("siapa istri samidi") ||
    userMessage?.includes("siapa isteri samit") ||
    userMessage?.includes("siapa istri samit")
  ) {
    bot.sendMessage(chatId, "Istri Dimas adalah @cheeseturr_shh.");
    return;
  }

  if (
    userMessage?.includes("kecepatan mengetik dimas") ||
    userMessage?.includes("wpm dimas")
  ) {
    bot.sendMessage(chatId, "Kecepatan mengetik Dimas saat ini 74-85 WPM.");
    return;
  }
  if (
    userMessage?.includes("kapan anak brantas lulus pkl") ||
    userMessage?.includes("brantas lulus kapan")
  ) {
    bot.sendMessage(chatId, "Brantas akan lulus tanggal 15 april, no debat");
    return;
  }

  if (
    userMessage?.includes("siapa itu bang tito") ||
    userMessage?.includes("siapa itu tito")
  ) {
    bot.sendMessage(
      chatId,
      "Dia adalah alumni UBiG, yang sekarang ada di Jember."
    );
    return;
  }
  if (
    userMessage?.includes("istri galuh") ||
    userMessage?.includes("siapa istri galuh")
  ) {
    bot.sendMessage(chatId, "Istri Galuh adalah Reina.");
    return;
  }
  if (userMessage === "berikan aku template laporan akhir pkl rpl") {
    bot.sendDocument(chatId, "TEMPLATE_LaporanAkhirPKL_RPL.docx", {
      caption: "Nih template laporan akhir PKL RPL, tinggal edit aja!",
    });
    return;
  }
  if (
    userMessage?.includes("siapa isteri lang") ||
    userMessage?.includes("siapa istri lang") ||
    userMessage?.includes("isteri lang") ||
    userMessage?.includes("istri lang")
  ) {
    bot.sendMessage(
      chatId,
      "Istri Lang saat ini tidak diketahui, mungkin belum menikah."
    );
    return;
  }
  if (userMessage?.includes("sekarang waktunya apa")) {
    bot.sendMessage(chatId, "Isi laporan buku birumu itu le.");
    return;
  }

  // Nama-nama yang lu mau
  const peopleInfo = {
    "ma'sum": "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    cheesetur: "Dia adalah isteri dari Dimas.",
    galuh: "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    niko: "Murid SMK Brantas Karangkates Dengan Jurusan DKV.",
    ferdin: "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    perdin: "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    rico: "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    richo: "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    lang: "Orang nggak PKL dasar sialan pukimak laso cuki.",
    tari: "Murid SMK Brantas Karangkates Dengan Jurusan DKV.",
    destantari: "Murid SMK Brantas Karangkates Dengan Jurusan DKV.",
    rotul: "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    siti: "Murid SMK Brantas Karangkates Dengan Jurusan RPL.",
    kepinketumbar: "Manusia Ketumbar?",
  };

  for (const [name, desc] of Object.entries(peopleInfo)) {
    if (
      userMessage?.includes(`siapa itu ${name}`) ||
      userMessage?.includes(`kisah ${name}`)
    ) {
      bot.sendMessage(chatId, desc);
      return;
    }
  }

  if (
    !userMessage ||
    !msg.reply_to_message ||
    !bot.botInfo ||
    msg.reply_to_message.from.id !== bot.botInfo.id
  ) {
    return;
  }

  const promptIntro = `Kamu adalah Tad Ai, asisten AI yang memberikan jawaban singkat dan jelas. Namun kamu juga harus ramah dan interaktif.`;

  try {
    const result = await model.generateContent(
      `${promptIntro}\n\nUser: ${userMessage}`
    );
    const response = result.response.text();

    bot.sendMessage(chatId, response);
  } catch (error) {
    console.error("Error:", error);
    bot.sendMessage(chatId, "Jangan Ngespam Woii! Gw capekk!");
  }
});

console.log("Bot jalan cuy!");
