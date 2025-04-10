const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "your_mysql_host.com", // Ganti ini (lihat di bawah)
  user: "cref8549_cmh",
  password: "creativemusichub",
  database: "cref8549_creativemusichub",
});

db.connect(err => {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/api/headers", (req, res) => {
  db.query("SELECT * FROM headers", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


import catalogImage1 from "../assets/img/catalog/hiphop-beat.jpg";
import catalogImage2 from "../assets/img/catalog/acoustic-vibe.jpg";
import catalogImage3 from "../assets/img/catalog/edm-track.jpg";

// import People1 from "../assets/img/portfolio/1D.png";
// import People2 from "../assets/img/portfolio/WDW.png";
// import People3 from "../assets/img/portfolio/BM.png";
// import People4 from "../assets/img/portfolio/LM.png";

import productDesc1 from "../assets/img/products/music-lyrics.jpg";
import productDesc2 from "../assets/img/products/10982.jpg";
import productDesc3 from "../assets/img/products/sound-engineer-studio.jpg";

import howItWorks1 from "../assets/img/products/undraw_file-sync_ag5g.png";
import howItWorks2 from "../assets/img/products/undraw_preferences_2bda.png";
import howItWorks3 from "../assets/img/products/undraw_file-analysis_dg81.png";
import howItWorks4 from "../assets/img/products/undraw_media-player_kxtm.png";

import "lucide-react";

export const NavLinks = {
  EN: [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/product", name: "Product" },
    { id: 3, path: "/support", name: "Support" },
    { id: 4, path: "/portfolio", name: "Portfolio" },
  ],
  ID: [
    { id: 1, path: "/", name: "Beranda" },
    { id: 2, path: "/product", name: "Produk" },
    { id: 3, path: "/support", name: "Dukungan" },
    { id: 4, path: "/portfolio", name: "Portofolio" },
  ],
  SD: [
    { id: 1, path: "/", name: "Tepas" },
    { id: 2, path: "/product", name: "Produk" },
    { id: 3, path: "/support", name: "Sokongan" },
    { id: 4, path: "/portfolio", name: "Portofolio" },
  ]
};

export const DropdownLinks = {
  EN: {
    1: [
      { path: "/musik-lyric", name: "Create Music from Lyrics" },
      { path: "/musik-instrument", name: "Create Instrumental Music" },
      { path: "/sound-effect", name: "Create Sound Effect" },
    ],
    2: [
      { path: "/support", name: "Contact Us" },
      { path: "https://www.instagram.com/yukmaridotcom", name: "Instagram" },
    ],
  },
  ID: {
    1: [
      { path: "/musik-lyric", name: "Buat Musik melalui Lirik" },
      { path: "/musik-instrument", name: "Buat Musik Instrumen" },
      { path: "/sound-effect", name: "Buat Efek Suara" },
    ],
    2: [
      { path: "/support", name: "Hubungi Kami" },
      { path: "https://www.instagram.com/yukmaridotcom", name: "Instagram" },
    ],
  },
  SD: {
    1: [
      { path: "/musik-lyric", name: "Nyieun Musik ti Lirik" },
      { path: "/musik-instrument", name: "Nyieun Musik Instrumen" },
      { path: "/sound-effect", name: "Nyieun Efek Sora" },
    ],
    2: [
      { path: "/support", name: "Kontak Urang" },
      { path: "https://www.instagram.com/yukmaridotcom", name: "Instagram" },
    ],
  }
};

export const TextContent = {
  EN: {
    title: "Create Your Music in Seconds",
    description:
      "Turn your inspiration into a masterpiece with advanced AI. No need for expensive studios—just upload your musical idea and let our AI transform it into artistic melodies and professional arrangements in minutes.",
    button: "TRY NOW",
    catalogTitle: "Our Products",
    catalogDescription: "Create your dream music easily in just minutes",
    portfolioTitle: "Portfolio",
    times: "times",
    step: "step",
    book: "Book Now",
    daftar: "Price List",
    howitworks: "How It Works",
  },
  ID: {
    title: "Ciptakan Musikmu Dalam Hitungan Detik",
    description:
      "Jadikan inspirasimu sebuah mahakarya dengan AI canggih. Tanpa perlu studio mahal, cukup unggah ide musikmu, dan biarkan AI kami menyulapnya menjadi melodi artistik serta aransemen profesional dalam hitungan menit.",
    button: "COBA SEKARANG",
    catalogTitle: "Produk Kami",
    catalogDescription:
      "Ciptakan Musik impianmu dengan mudah hanya dalam hitungan menit",
    portfolioTitle: "Portofolio",
    times: "kali",
    step: "langkah",
    book: "Pesan Sekarang",
    daftar: "Daftar Harga",
    howitworks: "Cara Kerja",
  },
  SD: {
    title: "Nyieun Musik Dina Sadetik",
    description: "Robah inspirasi anjeun jadi karya seni ku AI canggih. Teu perlu studio mahal, ngan upload ide musik anjeun, AI urang bakal ngarobah jadi melodi artistik sareng aransemen profesional dina sakedap.",
    button: "COBIAN AYEUNA",
    catalogTitle: "Produk Urang",
    catalogDescription: "Nyieun musik impian anjeun gampang dina sadetik",
    portfolioTitle: "Portofolio",
    times: "kali",
    step: "léngkah",
    book: "Pesenan Ayeuna",
    daftar: "Daptar Harga",
    howitworks: "Cara Migawéna"
  }
};

export const ProductContent = {
  ID: {
    title: "Produk Kami",
    description: "Ciptakan Musik impianmu dengan mudah hanya dalam hitungan menit",
  },
  EN: {
    title: "Our Products",
    description: "Create your dream music easily in just a few minutes",
  },
  SD: {
    title: "Produk Urang",
    description: "Nyieun musik impian anjeun gampang dina sadetik",
  },
};

export const products = {
  ID: [
    {
      id: 1,
      image: catalogImage1,
      name: "Buat Musik melalui Lyric",
      description: "Ubahlah lirikmu menjadi lagu otomatis.",
      cta: "Pesan Sekarang",
      rating: "Telah dipesan sebanyak: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Revisi Tidak Terbatas",
        "jenis file WAV & MP3",
        "Durasi maksimal. 5 menit",
      ],
      category: "lyrics",
    },
    {
      id: 2,
      image: catalogImage2,
      name: "Buat Musik Instrumen",
      description: "Ciptakan melodi instrumental profesional.",
      cta: "Pesan Sekarang",
      rating: "Telah dipesan sebanyak: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Revisi Tidak Terbatas",
        "jenis file WAV & MP3",
        "Durasi maksimal. 5 menit",
      ],
      category: "instrument",
    },
    {
      id: 3,
      image: catalogImage3,
      name: "Buat Sound Effect",
      description: "Hasilkan efek suara berkualitas tinggi.",
      cta: "Pesan Sekarang",
      rating: "Telah dipesan sebanyak: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Revisi Tidak Terbatas",
        "jenis file WAV & MP3",
        "Durasi maksimal. 30 detik",
      ],
      category: "sound",
    },
  ],
  EN: [
    {
      id: 1,
      image: catalogImage1,
      name: "Create Music from Lyrics",
      description: "Turn your lyrics into an automatic song.",
      cta: "Order Now",
      rating: "Ordered: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Unlimited Revisions",
        "WAV & MP3 File Format",
        "Max duration: 5 minutes",
      ],
      category: "lyrics",
    },
    {
      id: 2,
      image: catalogImage2,
      name: "Create Instrumental Music",
      description: "Craft professional instrumental melodies.",
      cta: "Order Now",
      rating: "Ordered: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Unlimited Revisions",
        "WAV & MP3 File Format",
        "Max duration: 5 minutes",
      ],
      category: "instrument",
    },
    {
      id: 3,
      image: catalogImage3,
      name: "Create Sound Effects",
      description: "Generate high-quality sound effects.",
      cta: "Order Now",
      rating: "Ordered: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Unlimited Revisions",
        "WAV & MP3 File Format",
        "Max duration: 30 seconds",
      ],
      category: "sound",
    },
  ],
  SD: [
    {
      id: 1,
      image: catalogImage1,
      name: "Nyieun Musik ti Lirik",
      description: "Robah lirik anjeun jadi lagu otomatis.",
      cta: "Pesenan Ayeuna",
      rating: "Tos dipesan: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Revisi Teu Kawates",
        "Format file WAV & MP3",
        "Durasi maksimal 5 menit",
      ],
      category: "lyrics",
    },
    {
      id: 2,
      image: catalogImage2,
      name: "Nyieun Musik Instrumen",
      description: "Nyieun melodi instrumental profesional.",
      cta: "Pesenan Ayeuna",
      rating: "Tos dipesan: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Revisi Teu Kawates",
        "Format file WAV & MP3",
        "Durasi maksimal 5 menit",
      ],
      category: "instrument",
    },
    {
      id: 3,
      image: catalogImage3,
      name: "Nyieun Efek Sora",
      description: "Ngahasilkeun efek sora kualitas tinggi.",
      cta: "Pesenan Ayeuna",
      rating: "Tos dipesan: ",
      currency: "Rp",
      price: 55000,
      features: [
        "Revisi Teu Kawates",
        "Format file WAV & MP3",
        "Durasi maksimal 30 detik",
      ],
      category: "sound",
    },
  ],
};

export const musicSectionData = {
  ID: {
    songTitle: "Lagu Ini Untukmu",
    playButton: "▶",
    pauseButton: "⏸",
    stopButton: "⏹",
    downloadButton: "Unduh Musik Anda",
  },
  EN: {
    songTitle: "This Song For You",
    playButton: "▶",
    pauseButton: "⏸",
    stopButton: "⏹",
    downloadButton: "Download Your Music",
  },
  SD: {
    songTitle: "Ieu Lagu Keur Anjeun",
    playButton: "▶",
    pauseButton: "⏸",
    stopButton: "⏹",
    downloadButton: "Unduh Musik Anjeun",
  },
};

export const musicInspirationData = {
  ID: {
    title: "Temukan <span>Inspirasimu</span> di Sekitar, <br /> Mulailah dari Perasaanmu!",
    text: `"Dengar suara hujan, lihat matahari terbit, rasakan detak jantungmu.
            Setiap lagu besar dimulai dari satu kata sederhana. Tulis apa yang kamu rasakan.
            Musik ada di mana-mana."`,
    aiTitle: "DAN BUAT <span>MUSIKMU DENGAN AI</span>",
    lyricPlaceholder: "Lirik Anda",
    createButton: "Buat",
  },
  EN: {
    title: "Find <span>Your Inspiration</span> Around You, <br /> Start with Your Feelings!",
    text: `"Listen to the sound of the rain, see the sunrise, feel your heartbeat.
            Every great song starts with a single word. Write what you feel.
            Music is everywhere."`,
    aiTitle: "AND CREATE YOUR <span>MUSIC WITH AI</span>",
    lyricPlaceholder: "Your Lyric",
    createButton: "Create",
  },
  SD: {
    title: "Panggihan <span>Inspirasi Anjeun</span> di Sakuriling, <br /> Mimitian ti Parasaan!",
    text: `"Dangukeun sora hujan, tingali panonpoe bijil, raoskeun detik jajantung anjeun.
            Unggal lagu agung dimimitian ku hiji kecap basajan. Tulis naon anu anjeun raoskeun.
            Musik aya di mana waé."`,
    aiTitle: "SARENG NYIEUN <span>MUSIK ANJEUN NGANGGO AI</span>",
    lyricPlaceholder: "Lirik Anjeun",
    createButton: "Nyieun",
  },
};

export const instrumentSectionData = {
  ID: {
    headline: `"Temukan Kebebasan Berkarya Melalui <span class="highlight">Instrumen</span> Buatanmu"`,
    subtext: `"Jadikan ide musikmu lebih hidup dengan instrumen buatan tangan yang bisa disesuaikan. 
               Desain, kustomisasi, dan mainkan semuanya ada di sini."`,
    buttonText: "MULAI SEKARANG",
  },
  EN: {
    headline: `"Discover the Freedom to Create Through <span class="highlight">Your Own Instruments</span>"`,
    subtext: `"Bring your musical ideas to life with handcrafted, customizable instruments. 
               Design, customize, and play—everything is here."`,
    buttonText: "GET STARTED",
  },
  SD: {
    headline: `"Panggihan Kabébasan Karya Ngaliwatan <span class="highlight">Instrumen</span> Jieunan Anjeun"`,
    subtext: `"Hirupkeun ide musik anjeun ku instrumen anu tiasa diropéa. 
               Desain, kustomisasi, sareng maénkeun sadayana aya di dieu."`,
    buttonText: "MIMITIAN AYEUNA",
  },
};

export const soundEffectSectionData = {
  ID: {
    title: `Buat <span class="span">Sound Effect </span> yang Meningkatkan Karya Musikmu`,
    div: {
      create: "BUAT",
      process: "PROSES",
      result: "HASIL",
    },
    buttons: {
      mainButton: "BUAT SEKARANG",
    },
  },
  EN: {
    title: `Create <span class="span">Sound Effects </span> that Enhance Your Music`,
    div: {
      create: "CREATE",
      process: "PROCESS",
      result: "RESULT",
    },
    buttons: {
      mainButton: "CREATE YOURS",
    },
  },
  SD: {
    title: `Nyieun <span class="span">Efek Sora </span> anu Ningkatkeun Karya Musik Anjeun`,
    div: {
      create: "NYIEUN",
      process: "PROSES",
      result: "HASIL",
    },
    buttons: {
      mainButton: "NYIEUN AYEUNA",
    },
  },
};

export const contactData = {
  ID: {
    title: "Kontak Kami",
    address: {
      title: "Alamat",
      detail: "Komp. Bandung Indah Raya, Blok C13/No.17, Kel. Mekarjaya, Kec. Rancasari, Kota Bandung, Jawa Barat 40286",
    },
    phone: {
      title: "Telepon",
      detail: "+62 822-9560-3115",
    },
    email: {
      title: "Email",
      detail: "yukmari2211@gmail.com",
    },
    form: {
      namePlaceholder: "Nama Anda",
      emailPlaceholder: "Email Anda",
      messagePlaceholder: "Pesan Anda",
      submitButton: "Kirim Pesan",
    },
  },
  EN: {
    title: "Contact Us",
    address: {
      title: "Address",
      detail: "Komp. Bandung Indah Raya, Block C13/No.17, Mekarjaya, Rancasari District, Bandung City, West Java 40286",
    },
    phone: {
      title: "Phone",
      detail: "+62 822-9560-3115",
    },
    email: {
      title: "Email",
      detail: "yukmari2211@gmail.com",
    },
    form: {
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      submitButton: "Send Message",
    },
  },
  SD: {
    title: "Kontak Urang",
    address: {
      title: "Alamat",
      detail: "Komp. Bandung Indah Raya, Blok C13/No.17, Kel. Mekarjaya, Kec. Rancasari, Dayeuh Bandung, Jawa Kulon 40286",
    },
    phone: {
      title: "Telepon",
      detail: "+62 822-9560-3115",
    },
    email: {
      title: "Email",
      detail: "yukmari2211@gmail.com",
    },
    form: {
      namePlaceholder: "Nami Anjeun",
      emailPlaceholder: "Email Anjeun",
      messagePlaceholder: "Pesen Anjeun",
      submitButton: "Kirim Pesen",
    },
  },
};

export const portfolioSectionData = {
  ID: {
    title: "Portofolio Kami",
    description: "Selamat datang di galeri musik kami! Nikmati koleksi video musik yang menarik.",
  },
  EN: {
    title: "Our Portfolio",
    description: "Welcome to our music gallery! Enjoy a collection of captivating music videos.",
  },
  SD: {
    title: "Portofolio Urang",
    description: "Wilujeng sumping ka galeri musik urang! Raoskeun koléksi video musik anu narik ati.",
  },
};

export const dataSwiper = {
  ID: [
    {
      id: 1,
      name: "Dapoer Catering SR",
      genre: "Accoustic",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389160&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 2,
      name: "Goyobod Laris",
      genre: "Dubstep",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389153&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 3,
      name: "Dimsum by Inmons Fix",
      genre: "Jazz",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389164&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 4,
      name: "Bubuk Cabe Pa Abdul",
      genre: "Pop",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046390272&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 5,
      name: "Aku Baru",
      genre: "Progressive",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389156&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 6,
      name: "Hudang Hese",
      genre: "Sundanese",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389168&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
  ],
  EN: [
    {
      id: 1,
      name: "Dapoer Catering SR",
      genre: "Accoustic",
      audio:
        "https://drive.google.com/uc?export=download&id=1wjlXCqg8fFdYQFFlnGpEsyrCe4pVg-8Y",
    },
    {
      id: 2,
      name: "Goyobod Laris",
      genre: "Dubstep",
      audio:
        "https://drive.google.com/uc?export=download&id=1iCKeV-omHdrnasaCK1e8-owQzBWbg4j2",
    },
    {
      id: 3,
      name: "Dimsum by Inmons Fix",
      genre: "Jazz",
      audio:
        "https://drive.google.com/uc?export=download&id=1-4opdmFQ0OTbIPBZzQSJYXq04qk_lkK-",
    },
    {
      id: 4,
      name: "Bubuk Cabe Pa Abdul",
      genre: "Pop",
      audio:
        "https://drive.google.com/uc?export=download&id=1MDBSbbYkwYJIjrn2356k-Vb-76195sHE",
    },
    {
      id: 5,
      name: "Aku Baru",
      genre: "Progressive",
      audio:
        "https://drive.google.com/uc?export=download&id=1iuEsfO3lpOmixBLMT0FMEMIaBFifWK8e",
    },
    {
      id: 6,
      name: "Hudang Hese",
      genre: "Sundanese",
      audio:
        "https://drive.google.com/uc?export=download&id=1IKN1fSkKKTD_9etHSiF4LtGDf6C_a4mD",
    },
  ],
  SD: [
    {
      id: 1,
      name: "Dapoer Catering SR",
      genre: "Accoustic",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389160&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 2,
      name: "Goyobod Laris",
      genre: "Dubstep",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389153&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 3,
      name: "Dimsum by Inmons Fix",
      genre: "Jazz",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389164&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 4,
      name: "Bubuk Cabe Pa Abdul",
      genre: "Pop",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046390272&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 5,
      name: "Aku Baru",
      genre: "Progressive",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389156&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: 6,
      name: "Hudang Hese",
      genre: "Sundanese",
      audio:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2046389168&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
  ],
};

export const portfolioDescriptions = {
  ID: {
    "Dapoer Catering SR": "Berdasarkan informasi yang tersedia, \"Dapoer Catering SR\" merupakan nama dari sebuah layanan katering yang menawarkan menu yang dapat disesuaikan dengan harga terjangkau.",
    "Goyobod Laris": "\"Goyobod Laris\" adalah judul lagu yang termasuk dalam album \"Afiliasi Company - Phase 1\" oleh Yuk-Mari Project.",
    "Dimsum by Inmons Fix": "\"Dimsum by Inmons Fix\" tampaknya terkait dengan konten promosi usaha dimsum oleh akun TikTok @dimsum.inmons.",
    "Bubuk Cabe Pa Abdul": "Lagu ini juga merupakan bagian dari album \"Afiliasi Company - Phase 1\" oleh Yuk-Mari Project.",
    "Aku Baru": "\"Aku Baru\" adalah lagu yang dipopulerkan oleh Bondan Prakoso. Lagu ini menceritakan tentang seseorang yang sebelumnya merasa sombong atas kemenangannya, namun kemudian menyadari pentingnya perubahan dan menjadi pribadi yang lebih baik. Liriknya menyoroti perjalanan introspeksi dan transformasi diri.",
    "Hudang Hese": "\"Hudang Hese\" dalam bahasa Sunda berarti \"sulit bangun\". Meskipun informasi spesifik mengenai lagu ini terbatas, judulnya mungkin mengindikasikan tema tentang kesulitan untuk bangun tidur atau menghadapi tantangan dalam memulai hari."
  },
  EN: {
    "Dapoer Catering SR": "Based on available information, \"Dapoer Catering SR\" is the name of a catering service that offers customizable menus at affordable prices.",
    "Goyobod Laris": "\"Goyobod Laris\" is a song title included in the album \"Afiliasi Company - Phase 1\" by Yuk-Mari Project.",
    "Dimsum by Inmons Fix": "\"Dimsum by Inmons Fix\" appears to be related to promotional content for a dimsum business by TikTok account @dimsum.inmons.",
    "Bubuk Cabe Pa Abdul": "This song is also part of the album \"Afiliasi Company - Phase 1\" by Yuk-Mari Project.",
    "Aku Baru": "\"Aku Baru\" is a song popularized by Bondan Prakoso. The song tells the story of someone who previously felt proud of their victory, but later realized the importance of change and becoming a better person. The lyrics highlight the journey of self-reflection and transformation.",
    "Hudang Hese": "\"Hudang Hese\" in Sundanese means \"difficult to wake up\". Although specific information about this song is limited, the title might indicate themes about the difficulty of waking up or facing challenges in starting the day."
  },
  SD: {
    "Dapoer Catering SR": "Dumasar kana informasi anu aya, \"Dapoer Catering SR\" mangrupa ngaran tina hiji layanan katering anu nawiskeun menu anu tiasa diropéa kalawan harga terjangkau.",
    "Goyobod Laris": "\"Goyobod Laris\" mangrupa judul lagu anu kaasup dina album \"Afiliasi Company - Phase 1\" ku Yuk-Mari Project.",
    "Dimsum by Inmons Fix": "\"Dimsum by Inmons Fix\" sigana aya hubunganana sareng konten promosi usaha dimsum ku akun TikTok @dimsum.inmons.",
    "Bubuk Cabe Pa Abdul": "Ieu lagu ogé mangrupa bagian tina album \"Afiliasi Company - Phase 1\" ku Yuk-Mari Project.",
    "Aku Baru": "\"Aku Baru\" mangrupa lagu anu dipopulerkeun ku Bondan Prakoso. Ieu lagu nyaritakeun ngeunaan hiji jalma anu sateuacanna ngarasa sombong kana kamenanganana, tapi engkéna sadar kana pentingna parobahan sareng jadi pribadi anu langkung saé. Lirikna nyorotikeun perjalanan introspeksi sareng transformasi diri.",
    "Hudang Hese": "\"Hudang Hese\" dina basa Sunda hartina \"susah hudang\". Sanajan informasi spesifik ngeunaan ieu lagu kawates, judulna panginten ngindikasi tema ngeunaan kasusah hudang atanapi nyanghareupan tantangan dina mimitian poé."
  }
};

export const creativeMusicHubData = {
  ID: {
    name: "CreativeMusic",
    address: "Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Kota Bandung, Jawa Barat 40286",
    contact: {
      phone: "+62 822-9560-3115",
      email: "yukmari2211@gmail.com",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/yukmaridotcom",
      website: "https://www.yuk-mari.com/",
      email: "yukmari2211@gmail.com",
    },
    products: [
      { name: "Buat Musik melalui Lirik", link: "/musik-lyric" },
      { name: "Buat Musik Instrumen", link: "/musik-instrument" },
      { name: "Buat Efek Suara", link: "/sound-effect" },
      { name: "Portofolio", link: "/portfolio" },
    ],
    footerTexts: ["Kebijakan Privasi", "Ketentuan Penggunaan", "Peta Situs"],
    visitorsLabel: "Total Pengunjung",
  },
  EN: {
    name: "CreativeMusic",
    address: "Komplek Bandung Indah Raya, Block C13/No.17, Mekarjaya Village, Rancasari District, Bandung City, West Java 40286",
    contact: {
      phone: "+62 822-9560-3115",
      email: "yukmari2211@gmail.com",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/yukmaridotcom",
      website: "https://www.yuk-mari.com/",
      email: "yukmari2211@gmail.com",
    },
    products: [
      { name: "Create Music through Lyrics", link: "/musik-lyric" },
      { name: "Create Instrumental Music", link: "/musik-instrument" },
      { name: "Create Sound Effects", link: "/sound-effect" },
      { name: "Portfolio", link: "/portfolio" },
    ],
    footerTexts: ["Privacy Policy", "Terms of Use", "Sitemap"],
    visitorsLabel: "Total Visitors",
  },
  SD: {
    name: "CreativeMusic",
    address: "Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Dayeuh Bandung, Jawa Kulon 40286",
    contact: {
      phone: "+62 822-9560-3115",
      email: "yukmari2211@gmail.com",
    },
    socialMedia: {
      instagram: "https://www.instagram.com/yukmaridotcom",
      website: "https://www.yuk-mari.com/",
      email: "yukmari2211@gmail.com",
    },
    products: [
      { name: "Nyieun Musik ti Lirik", link: "/musik-lyric" },
      { name: "Nyieun Musik Instrumen", link: "/musik-instrument" },
      { name: "Nyieun Efek Sora", link: "/sound-effect" },
      { name: "Portofolio", link: "/portfolio" },
    ],
    footerTexts: ["Kawijakan Privasi", "Katangtuan Pamakean", "Peta Situs"],
    visitorsLabel: "Total Pangunjung",
  },
};

// Product Descriptions
export const productDescriptions = {
  ID: [
    {
      id: 1,
      page: "lyrics",
      title: "Buat Musik dari Lirik",
      description1:
        "Dengan CMH.AI, kamu hanya perlu mengunggah lirik untuk mendapatkan musik yang sesuai dengan tema dan mood yang kamu inginkan.",
      description2:
        "Tidak perlu repot belajar produksi musik atau mencari musisi. Nikmati berbagai pilihan genre dan aransemen yang disesuaikan dengan lirikmu, apakah untuk video, podcast, atau proyek pribadi.",
      description3:
        "Mulai dari Rp. 150.000, CMH.AI menawarkan solusi cepat dan mudah untuk menghasilkan musik berkualitas tinggi. Pilih genre yang diinginkan, unggah lirik, dan biarkan AI kami bekerja. Dalam waktu singkat, kamu akan memiliki musik yang sempurna untuk melengkapi karya kreatifmu.",
      imageUrl: productDesc1,
    },
    {
      id: 2,
      page: "instrument",
      title: "Buat Musik dari Instrumen",
      description1:
        "Dengan CMH.AI, kamu hanya perlu memilih instrumen yang diinginkan dan biarkan AI kami menciptakan musik berkualitas tinggi untukmu.",
      description2:
        "Tidak perlu keterampilan komposisi atau pengalaman dalam musik untuk membuat karya yang menakjubkan. Nikmati berbagai pilihan genre dan gaya musik yang bisa disesuaikan dengan kebutuhan kamu, apakah untuk video, iklan, atau proyek kreatif lainnya.",
      description3:
        "Mulai dari Rp. 200.000, Musik.AI menawarkan solusi cepat dan mudah untuk menghasilkan musik original tanpa batasan. Pilih instrumen, tentukan suasana hati, dan biarkan AI kami bekerja. Dalam waktu singkat, kamu akan memiliki lagu lengkap dengan instrumen yang siap digunakan.",
      imageUrl: productDesc2,
    },
    {
      id: 3,
      page: "sound",
      title: "Buat Musik dari Efek Suara",
      description1:
        "Dengan CMH.AI, kamu hanya perlu mengunggah efek suara untuk mendapatkan musik yang sesuai dengan suasana dan nuansa yang diinginkan.",
      description2:
        "Tidak perlu repot mengatur instrumen atau mencari komposer. Nikmati berbagai pilihan genre dan aransemen musik yang disesuaikan dengan efek suara yang kamu pilih, apakah untuk film, video, atau proyek kreatif lainnya.",
      description3:
        "Mulai dari Rp. 100.000, CMH.AI menawarkan solusi cepat dan mudah untuk menghasilkan musik berkualitas tinggi. Pilih paket yang sesuai, unggah efek suara, dan biarkan AI kami bekerja. Dalam waktu singkat, kamu akan memiliki musik yang sempurna untuk melengkapi karyamu.",
      imageUrl: productDesc3,
    },
  ],
  EN: [
    {
      id: 1,
      page: "lyrics",
      title: "Create Music from Lyrics",
      description1:
        "With CMH.AI, simply upload your lyrics to get music that matches the theme and mood you desire.",
      description2:
        "No need to learn music production or find musicians. Enjoy a variety of genres and arrangements tailored to your lyrics, whether for videos, podcasts, or personal projects.",
      description3:
        "Starting from Rp. 150,000, CMH.AI offers a fast and easy solution to produce high-quality music. Choose your genre, upload your lyrics, and let our AI do the work. In no time, you'll have the perfect music to complement your creative project.",
      imageUrl: productDesc1,
    },
    {
      id: 2,
      page: "instrument",
      title: "Create Music from Instruments",
      description1:
        "With CMH.AI, simply choose your desired instrument and let our AI create high-quality music for you.",
      description2:
        "No composition skills or music experience needed to create an amazing piece. Enjoy various genre options and musical styles customized to your needs, whether for videos, ads, or creative projects.",
      description3:
        "Starting from Rp. 200,000, Musik.AI offers a fast and easy solution to create original music without limits. Choose an instrument, set the mood, and let our AI do the work. In no time, you'll have a full song with ready-to-use instruments.",
      imageUrl: productDesc2,
    },
    {
      id: 3,
      page: "sound",
      title: "Create Music from Sound Effects",
      description1:
        "With CMH.AI, simply upload sound effects to get music that matches the atmosphere and vibe you desire.",
      description2:
        "No need to arrange instruments or find composers. Enjoy various genres and musical arrangements tailored to your chosen sound effects, whether for films, videos, or other creative projects.",
      description3:
        "Starting from Rp. 100,000, CMH.AI offers a fast and easy solution to produce high-quality music. Choose the right package, upload sound effects, and let our AI do the work. In no time, you'll have the perfect music to complete your project.",
      imageUrl: productDesc3,
    },
  ],
};

// How It Works Steps
export const howItWorksSteps = {
  ID: [
    {
      id: 1,
      page: "lyrics",
      steps: [
        {
          text: "Masukkan lirik Anda ke dalam kolom input.",
          imageUrl: howItWorks1,
        },
        {
          text: "Pilih genre musik dan tempo yang Anda inginkan.",
          imageUrl: howItWorks2,
        },
        {
          text: "Biarkan AI kami menganalisis lirik Anda dan menghasilkan melodi.",
          imageUrl: howItWorks3,
        },
        {
          text: "Unduh lagu Anda dan bagikan dengan semua orang!",
          imageUrl: howItWorks4,
        },
      ],
    },
    {
      id: 2,
      page: "instrument",
      steps: [
        {
          text: "Unggah rekaman permainan instrumen Anda.",
          imageUrl: howItWorks1,
        },
        {
          text: "Pilih suasana hati dan gaya untuk lagu Anda.",
          imageUrl: howItWorks2,
        },
        {
          text: "AI kami akan memproses rekaman dan membuat aransemen lengkap.",
          imageUrl: howItWorks3,
        },
        {
          text: "Unduh lagu akhir dan nikmati kreasi Anda!",
          imageUrl: howItWorks4,
        },
      ],
    },
    {
      id: 3,
      page: "sound",
      steps: [
        {
          text: "Unggah efek suara Anda atau pilih dari perpustakaan kami.",
          imageUrl: howItWorks1,
        },
        {
          text: "Pilih genre dan struktur untuk lagu Anda.",
          imageUrl: howItWorks2,
        },
        {
          text: "AI kami akan memadukan suara menjadi komposisi yang kohesif.",
          imageUrl: howItWorks3,
        },
        {
          text: "Unduh lagu akhir dan nikmati kreasi Anda!",
          imageUrl: howItWorks4,
        },
      ],
    },
  ],
  EN: [
    {
      id: 1,
      page: "lyrics",
      steps: [
        {
          text: "Enter your lyrics into the input field.",
          imageUrl: howItWorks1,
        },
        {
          text: "Choose your desired music genre and tempo.",
          imageUrl: howItWorks2,
        },
        {
          text: "Let our AI analyze your lyrics and generate a melody.",
          imageUrl: howItWorks3,
        },
        {
          text: "Download your song and share it with everyone!",
          imageUrl: howItWorks4,
        },
      ],
    },
    {
      id: 2,
      page: "instrument",
      steps: [
        {
          text: "Upload your instrument recording.",
          imageUrl: howItWorks1,
        },
        {
          text: "Choose the mood and style for your song.",
          imageUrl: howItWorks2,
        },
        {
          text: "Our AI will process the recording and create a full arrangement.",
          imageUrl: howItWorks3,
        },
        {
          text: "Download the final song and enjoy your creation!",
          imageUrl: howItWorks4,
        },
      ],
    },
    {
      id: 3,
      page: "sound",
      steps: [
        {
          text: "Upload your sound effects or choose from our library.",
          imageUrl: howItWorks1,
        },
        {
          text: "Select the genre and structure for your song.",
          imageUrl: howItWorks2,
        },
        {
          text: "Our AI will blend the sounds into a cohesive composition.",
          imageUrl: howItWorks3,
        },
        {
          text: "Download the final song and enjoy your creation!",
          imageUrl: howItWorks4,
        },
      ],
    },
  ],
  SD: [
    {
      id: 1,
      page: "lyrics",
      steps: [
        {
          text: "Masukkan lirik Anjeun ke dalam kolom input.",
          imageUrl: howItWorks1,
        },
        {
          text: "Pilih genre musik dan tempo yang Anjeun inginkan.",
          imageUrl: howItWorks2,
        },
        {
          text: "Biarkan AI kami menganalisis lirik Anjeun dan menghasilkan melodi.",
          imageUrl: howItWorks3,
        },
        {
          text: "Unduh lagu Anjeun dan bagikan dengan semua orang!",
          imageUrl: howItWorks4,
        },
      ],
    },
    {
      id: 2,
      page: "instrument",
      steps: [
        {
          text: "Unggah rekaman permainan instrumen Anjeun.",
          imageUrl: howItWorks1,
        },
        {
          text: "Pilih suasana hati dan gaya untuk lagu Anjeun.",
          imageUrl: howItWorks2,
        },
        {
          text: "AI kami akan memproses rekaman dan membuat aransemen lengkap.",
          imageUrl: howItWorks3,
        },
        {
          text: "Unduh lagu akhir dan nikmati kreasi Anjeun!",
          imageUrl: howItWorks4,
        },
      ],
    },
    {
      id: 3,
      page: "sound",
      steps: [
        {
          text: "Unggah efek suara Anjeun atau pilih dari perpustakaan kami.",
          imageUrl: howItWorks1,
        },
        {
          text: "Pilih genre dan struktur untuk lagu Anjeun.",
          imageUrl: howItWorks2,
        },
        {
          text: "AI kami akan memadukan suara menjadi komposisi yang kohesif.",
          imageUrl: howItWorks3,
        },
        {
          text: "Unduh lagu akhir dan nikmati kreasi Anjeun!",
          imageUrl: howItWorks4,
        },
      ],
    },
  ],
};

// // Price Lists
// export const priceLists = {
//   ID: [
//     {
//       id: 1,
//       page: "lyrics",
//       plans: [
//         {
//           name: "Buat Musik Melalui Lirik",
//           features: [
//             "Revisi Tidak Terbatas",
//             "Jenis file WAV & MP3",
//             "Durasi maksimal. 5 menit",
//           ],
//           currency: "Rp",
//           price: 55000,
//         },
//       ],
//     },
//     {
//       id: 2,
//       page: "instrument",
//       plans: [
//         {
//           name: "Buat Musik Instrumen",
//           currency: "Rp",
//           price: 55000,
//           features: [
//             "Revisi Tidak Terbatas",
//             "Jenis file WAV & MP3",
//             "Durasi maksimal. 5 menit",
//           ],
//         },
//       ],
//     },
//     {
//       id: 3,
//       page: "sound",
//       plans: [
//         {
//           name: "Buat Efek Suara",
//           currency: "Rp",
//           price: 55000,
//           features: [
//             "Revisi Tidak Terbatas",
//             "Jenis file WAV & MP3",
//             "Durasi maksimal. 30 detik",
//           ],
//         },
//       ],
//     },
//   ],
//   EN: [
//     {
//       id: 1,
//       page: "lyrics",
//       plans: [
//         {
//           name: "Create Music From Lyrics",
//           features: [
//             "Unlimited revisions",
//             "File format WAV & MP3",
//             "Max duration 5 minutes",
//           ],
//           currency: "Rp",
//           price: 55000,
//         },
//       ],
//     },
//     {
//       id: 2,
//       page: "instrument",
//       plans: [
//         {
//           name: "Create Instrumental Music",
//           currency: "Rp",
//           price: 55000,
//           features: [
//             "Unlimited revisions",
//             "File format WAV & MP3",
//             "Max duration 5 minutes",
//           ],
//         },
//       ],
//     },
//     {
//       id: 3,
//       page: "sound",
//       plans: [
//         {
//           name: "Create Sound Effects",
//           currency: "Rp",
//           price: 55000,
//           features: [
//             "Unlimited revisions",
//             "File format WAV & MP3",
//             "Max duration 30 seconds",
//           ],
//         },
//       ],
//     },
//   ],
// };
