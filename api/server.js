/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import midtransClient from "midtrans-client";
import mysql from "mysql2";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import axios from "axios";

dotenv.config();
const app = express();

// ✅ CORS: Allow your deployed frontend & localhost for testing
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://magang-fikri.vercel.app", // Deployed frontend
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Secure session handling
app.use(
  session({
    secret: process.env.SESSION_SECRET || "admin", // Use env variable for security
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure in production
      httpOnly: true, // Prevent XSS attacks
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Ensure static files are served correctly
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "crefcref8549_cmh",
  password: "creativemusichub",
  database: "cref8549_creativemusichub",
});

// MySQL Database Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT || 3306, // Use env variable
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "creativemusichub",
//   multipleStatements: true, // Allow multiple queries
//   connectTimeout: 10000, // Increase timeout
// });

// ✅ Handle database connection errors
const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error("❌ Error connecting to the database:", err);
      setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    } else {
      console.log("✅ Connected to the database");
    }
  });
};
connectDB();

// ✅ Handle lost MySQL connection (Railway may drop idle connections)
db.on("error", (err) => {
  console.error("⚠️ Database error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("🔄 Reconnecting to the database...");
    connectDB();
  } else {
    throw err;
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Start the server
// const PORT1 = process.env.PORT || 8080;
// app.listen(PORT1, () => {
//   console.log(`🚀 Server is running on port ${PORT1}`);
// });

// Fungsi untuk membuat database dan tabel admin jika belum ada
const createDatabaseAndTable = () => {
  db.query("CREATE DATABASE IF NOT EXISTS creativemusichub", (err) => {
    if (err) {
      console.error("❌ Error creating database:", err);
      return;
    }
    console.log("✅ Database created or already exists");

    // Gunakan database yang baru dibuat
    db.changeUser({ database: "creativemusichub" });

    // Membuat tabel admin jika belum ada
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

    db.query(createTableQuery, (err) => {
      if (err) {
        console.error("❌ Error creating admin table:", err);
        return;
      }
      console.log("✅ Admin table created or already exists");

      addAdminUser("admin", "password123", "admin@example.com");
    });

    // Membuat tabel visitor jika belum ada
    const createTableQuery_visitor = `
            CREATE TABLE IF NOT EXISTS visitors (
                id INT PRIMARY KEY AUTO_INCREMENT,
                count INT NOT NULL
            );
        `;

    db.query(createTableQuery_visitor, (err) => {
      if (err) {
        console.error("❌ Error creating visitors table:", err);
        return;
      }
      console.log("✅ Visitors table created or already exists");

      // Cek apakah sudah ada data di tabel visitors
      const checkVisitorQuery = "SELECT COUNT(*) AS count FROM visitors";
      const addVisitorQuery = "INSERT INTO visitors (count) VALUES (0)";

      db.query(checkVisitorQuery, (err, result) => {
        if (err) {
          console.error("❌ Error checking visitors table:", err);
          return;
        }

        const visitorExists = result[0].count > 0;

        if (!visitorExists) {
          db.query(addVisitorQuery, (err) => {
            if (err) {
              console.error("❌ Error adding initial visitor count:", err);
              return;
            }
            console.log("✅ Initial visitor count added successfully");
          });
        } else {
          console.log("⚠️ Visitors table already has data, skipping insertion");
        }
      });
    });

    // Membuat tabel FAQ jika belum ada
    const createTableQuery_faq = `
  CREATE TABLE IF NOT EXISTS faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id VARCHAR(255),
    answer_id VARCHAR(255),
    question_en VARCHAR(255),
    answer_en TEXT NOT NULL,
    question_sd VARCHAR(255),
    answer_sd TEXT,
    status ENUM('Published', 'Archived') DEFAULT 'Archived',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

    db.query(createTableQuery_faq, (err) => {
      if (err) {
        console.error("❌ Error creating FAQ table:", err);
        return;
      }
      console.log("✅ FAQ table created or already exists");

      // Isi data default jika tabel kosong
      db.query("SELECT COUNT(*) FROM faq", (err, results) => {
        if (err) {
          console.error("❌ Error checking FAQ table count:", err);
          return;
        }

        if (results[0]["COUNT(*)"] === 0) {
          const defaultFaqs = [
            {
              question_id: "Apa itu CMH dan bagaimana cara kerjanya?",
              answer_id:
                "CreativeMusicHub (CMH) adalah platform untuk menciptakan musik dengan bantuan AI. Pengguna dapat mengunggah lirik, memilih genre, dan mendapatkan lagu yang dibuat secara otomatis.",
              question_en: "What is CMH and how does it work?",
              answer_en:
                "CreativeMusicHub (CMH) is a platform for creating music with AI assistance. Users can upload lyrics, choose a genre, and get an automatically generated song.",
              question_sd: "Naon ari CMH sareng kumaha carana?",
              answer_sd:
                "CreativeMusicHub (CMH) nyaéta platform pikeun nyieun musik ngagunakeun AI. Pangguna tiasa ngunggahkeun lirik, milih genre, sareng nampi lagu anu dijieun sacara otomatis.",
              status: "Published",
            },
            {
              question_id:
                "Apakah saya perlu keahlian musik untuk menggunakan CMH?",
              answer_id:
                "Tidak perlu! CMH dirancang untuk semua orang, baik pemula maupun profesional. Teknologi AI kami akan membantu dalam proses pembuatan musik.",
              question_en: "Do I need musical skills to use CMH?",
              answer_en:
                "No, you don't! CMH is designed for everyone, from beginners to professionals. Our AI technology will assist in the music creation process.",
              question_sd:
                "Naha abdi peryogi kapinteran musik pikeun nganggo CMH?",
              answer_sd:
                "Henteu peryogi! CMH dirarancang pikeun sadayana, ti nu nembe dugi ka profesional. Téknologi AI urang bakal ngabantosan dina prosés nyieun musik.",
              status: "Published",
            },
            {
              question_id: "Jenis musik apa saja yang bisa dibuat dengan CMH?",
              answer_id:
                "CMH mendukung berbagai genre musik seperti pop, rock, jazz, EDM, dan masih banyak lagi.",
              question_en: "What types of music can be created with CMH?",
              answer_en:
                "CMH supports various music genres such as pop, rock, jazz, EDM, and many more.",
              question_sd: "Jenis musik naon waé anu tiasa dijieun ku CMH?",
              answer_sd:
                "CMH ngadukung rupa-rupa genre musik sapertos pop, rock, jazz, EDM, sareng seueur deui.",
              status: "Published",
            },
            {
              question_id: "Bagaimana cara mengubah lirik menjadi lagu?",
              answer_id:
                "Anda hanya perlu mengunggah lirik, memilih genre, dan CMH akan secara otomatis menghasilkan musik yang sesuai dengan lirik tersebut.",
              question_en: "How do I turn lyrics into a song?",
              answer_en:
                "Simply upload your lyrics, select a genre, and CMH will automatically generate music that matches the lyrics.",
              question_sd: "Naon cara nanggo lirik jadi lagu?",
              answer_sd:
                "Sampeyan cuma perlu ngunggah lirik, milih genre, sareng CMH bakal nampi lagu anu sesuai karo lirik katon.",
              status: "Published",
            },
            {
              question_id: "Apakah saya bisa memilih genre musik tertentu?",
              answer_id:
                "Ya! CMH menyediakan berbagai pilihan genre musik yang dapat Anda pilih sesuai dengan preferensi Anda.",
              question_en: "Can I choose a specific music genre?",
              answer_en:
                "Yes! CMH offers various genre options that you can choose based on your preference.",
              question_sd: "Naha abdi bisa milih genre musik?",
              answer_sd:
                "Iya! CMH ngadukung rupa-rupa genre musik anu bisa dipilih katon kana preferensi sampeyan.",
              status: "Published",
            },
            {
              question_id:
                "Berapa lama waktu yang dibutuhkan untuk membuat musik?",
              answer_id:
                "Proses pembuatan musik biasanya memakan waktu beberapa menit, tergantung pada kompleksitas lirik dan pemilihan instrumen.",
              question_en: "How long does it take to create music?",
              answer_en:
                "The music creation process usually takes a few minutes, depending on the complexity of the lyrics and instrument selection.",
              question_sd: "Naon waktu anu diperyogi pikeun nyieun musik?",
              answer_sd:
                "Proses nyieun musik biasana ngarasakakeun waktu beberapa menit, tergantung kana kompleksitas lirik sareng pemilihan instrumen.",
              status: "Published",
            },
            {
              question_id:
                "Apakah musik yang dihasilkan bisa digunakan secara komersial?",
              answer_id:
                "Ya, musik yang dihasilkan melalui CMH bisa digunakan secara komersial. Namun, pastikan untuk membaca ketentuan penggunaan terlebih dahulu.",
              question_en: "Can the generated music be used commercially?",
              answer_en:
                "Yes, music created through CMH can be used commercially. However, please review the terms of use first.",
              question_sd:
                "Naha musik anu dihasilkeun ku CMH bisa dipakekeun karo komersial?",
              answer_sd:
                "Iya, musik anu dihasilkeun ku CMH bisa dipakekeun karo komersial. Tapi, pastikeun nanggo ketentuan penggunaan dina awal.",
              status: "Published",
            },
            {
              question_id:
                "Bagaimana jika saya mengalami masalah saat membuat musik?",
              answer_id:
                "Anda dapat menghubungi tim dukungan kami melalui email atau WhatsApp yang tersedia di halaman kontak.",
              question_en: "What if I encounter issues while creating music?",
              answer_en:
                "You can contact our support team via email or WhatsApp, available on the contact page.",
              question_sd:
                "Naha abdi ngarasakakeun masalah nanggo nyieun musik?",
              answer_sd:
                "Sampeyan bisa kontak tim dukungan kami ku email atawa WhatsApp, anu tersedia di halaman kontak.",
              status: "Published",
            },
          ];

          defaultFaqs.forEach((faq) => {
            const insertQuery = `
          INSERT INTO faq (
            question_id, 
            answer_id, 
            question_en, 
            answer_en, 
            question_sd, 
            answer_sd, 
            status
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
            db.query(
              insertQuery,
              [
                faq.question_id,
                faq.answer_id,
                faq.question_en,
                faq.answer_en,
                faq.question_sd,
                faq.answer_sd,
                faq.status,
              ],
              (insertErr) => {
                if (insertErr) {
                  console.error("❌ Error inserting default FAQ:", insertErr);
                } else {
                  console.log("✅ Default FAQ inserted successfully");
                }
              }
            );
          });
        }
      });
    });

    // Fungsi untuk membuat tabel header jika belum ada
    const createHeaderTable = `
  CREATE TABLE IF NOT EXISTS headers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position INT,
    content_en VARCHAR(255),
    content_id VARCHAR(255),
    content_sd VARCHAR(255),
    path VARCHAR(255),
    parent_id INT NULL
  );
`;

    db.query(createHeaderTable, (err) => {
      if (err) {
        console.error("❌ Error creating header table:", err);
        return;
      }
      console.log("✅ Header table created or already exists");

      // Isi data default jika tabel kosong
      db.query("SELECT COUNT(*) FROM headers", (err, results) => {
        if (err) {
          console.error("❌ Error checking header table count:", err);
          return;
        }

        if (results[0]["COUNT(*)"] === 0) {
          const defaultHeaders = [
            {
              position: 1,
              content_en: "Home",
              content_id: "Beranda",
              content_sd: "Utama",
              path: "/",
              parent_id: null,
            },
            {
              position: 2,
              content_en: "Product",
              content_id: "Produk",
              path: "/product",
              parent_id: null,
            },
            {
              position: 3,
              content_en: "Support",
              content_id: "Dukungan",
              path: "/support",
              parent_id: null,
            },
            {
              position: 4,
              content_en: "Portfolio",
              content_id: "Portofolio",
              path: "/portfolio",
              parent_id: null,
            },
            {
              position: 1,
              content_en: "Create Music from Lyrics",
              content_id: "Buat Musik melalui Lirik",
              path: "/musik-lyric",
              parent_id: 2,
            },
            {
              position: 2,
              content_en: "Create Instrumental Music",
              content_id: "Buat Musik Instrumen",
              path: "/musik-instrument",
              parent_id: 2,
            },
            {
              position: 3,
              content_en: "Create Sound Effect",
              content_id: "Buat Efek Suara",
              path: "/sound-effect",
              parent_id: 2,
            },
            {
              position: 1,
              content_en: "Contact Us",
              content_id: "Hubungi Kami",
              path: "/support",
              parent_id: 3,
            },
            {
              position: 2,
              content_en: "Instagram",
              content_id: "Instagram",
              path: "https://www.instagram.com/yukmaridotcom",
              parent_id: 3,
            },
          ];

          defaultHeaders.forEach((header) => {
            const insertQuery = `
          INSERT INTO headers (position, content_en, content_id, content_sd, path, parent_id)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
            db.query(
              insertQuery,
              [
                header.position,
                header.content_en,
                header.content_id,
                header.content_sd,
                header.path,
                header.parent_id,
              ],
              (insertErr) => {
                if (insertErr) {
                  console.error(
                    "❌ Error inserting default header:",
                    insertErr
                  );
                } else {
                  console.log("✅ Default header inserted successfully");
                }
              }
            );
          });
        }
      });
    });

    // Fungsi untuk membuat tabel footer jika belum ada
    const createFooterTable = `
  CREATE TABLE IF NOT EXISTS footer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address_id TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    instagram_name VARCHAR(255),
    instagram_link VARCHAR(255),
    website_name VARCHAR(255),
    website_link VARCHAR(255),
    
    /* Bahasa Indonesia */
    product1_name_id VARCHAR(255),
    product1_link_id VARCHAR(255),
    product2_name_id VARCHAR(255),
    product2_link_id VARCHAR(255),
    product3_name_id VARCHAR(255),
    product3_link_id VARCHAR(255),
    product4_name_id VARCHAR(255),
    product4_link_id VARCHAR(255),
    privacy_policy_id VARCHAR(255),
    terms_of_use_id VARCHAR(255),
    sitemap_id VARCHAR(255),
    
    /* Bahasa Inggris */
    address_en TEXT,
    product1_name_en VARCHAR(255),
    product1_link_en VARCHAR(255),
    product2_name_en VARCHAR(255),
    product2_link_en VARCHAR(255),
    product3_name_en VARCHAR(255),
    product3_link_en VARCHAR(255),
    product4_name_en VARCHAR(255),
    product4_link_en VARCHAR(255),
    privacy_policy_en VARCHAR(255),
    terms_of_use_en VARCHAR(255),
    sitemap_en VARCHAR(255),
    
    /* Bahasa Sunda */
    address_sd TEXT,
    product1_name_sd VARCHAR(255),
    product1_link_sd VARCHAR(255),
    product2_name_sd VARCHAR(255),
    product2_link_sd VARCHAR(255),
    product3_name_sd VARCHAR(255),
    product3_link_sd VARCHAR(255),
    product4_name_sd VARCHAR(255),
    product4_link_sd VARCHAR(255),
    privacy_policy_sd VARCHAR(255),
    terms_of_use_sd VARCHAR(255),
    sitemap_sd VARCHAR(255)
  );
`;

    db.query(createFooterTable, (err) => {
      if (err) {
        console.error("❌ Error creating footer table:", err);
        return;
      }
      console.log("✅ Footer table created or already exists");

      // Isi data default jika tabel kosong
      db.query("SELECT COUNT(*) FROM footer", (err, results) => {
        if (err) {
          console.error("❌ Error checking footer table count:", err);
          return;
        }

        if (results[0]["COUNT(*)"] === 0) {
          const defaultFooters = [
            {
              address_id:
                "Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Kota Bandung, Jawa Barat 40286",
              phone: "+62 822-9560-3115",
              email: "yukmari2211@gmail.com",
              instagram_name: "Instagram",
              instagram_link: "https://www.instagram.com/yukmaridotcom",
              website_name: "Website",
              website_link: "https://www.yuk-mari.com/",
              address_en:
                "Komplek Bandung Indah Raya, Block C13/No.17, Mekarjaya Village, Rancasari District, Bandung City, West Java 40286",
              address_sd:
                "Komplek Bandung Indah Raya, Block C13/No.17, Mekarjaya Village, Rancasari District, Bandung City, West Java 40286",
              product1_name_id: "Buat Musik melalui Lyric",
              product1_link_id: "/musik-lyric",
              product2_name_id: "Buat Musik Instrumen",
              product2_link_id: "/musik-instrument",
              product3_name_id: "Buat Sound Effect",
              product3_link_id: "/sound-effect",
              product4_name_id: "Portofolio",
              product4_link_id: "/portfolio",
              privacy_policy_id: "Kebijakan Privasi",
              terms_of_use_id: "Ketentuan Penggunaan",
              sitemap_id: "Peta Situs",
              product1_name_en: "Create Music through Lyrics",
              product1_link_en: "/musik-lyric",
              product2_name_en: "Create Instrumental Music",
              product2_link_en: "/musik-instrument",
              product3_name_en: "Create Sound Effects",
              product3_link_en: "/sound-effect",
              product4_name_en: "Portfolio",
              product4_link_en: "/portfolio",
              privacy_policy_en: "Privacy Policy",
              terms_of_use_en: "Terms of Use",
              sitemap_en: "Sitemap",
              address_sd:
                "Komplek Bandung Indah Raya, Blok C13/No.17, Kelurahan Mekarjaya, Kecamatan Rancasari, Dayeuh Bandung, Jawa Kulon 40286",
              product1_name_sd: "Nyieun Musik ti Lirik",
              product1_link_sd: "/musik-lyric",
              product2_name_sd: "Nyieun Musik Instrumen",
              product2_link_sd: "/musik-instrument",
              product3_name_sd: "Nyieun Efek Sora",
              product3_link_sd: "/sound-effect",
              product4_name_sd: "Portofolio",
              product4_link_sd: "/portfolio",
              privacy_policy_sd: "Kawijakan Privasi",
              terms_of_use_sd: "Katangtuan Pamakean",
              sitemap_sd: "Peta Situs",
            },
          ];

          defaultFooters.forEach((footer) => {
            const insertQuery = `
          INSERT INTO footer (
            address_id, phone, email, instagram_name, instagram_link, website_name, website_link,
            address_en, address_sd,
            product1_name_id, product1_link_id, product2_name_id, product2_link_id, 
            product3_name_id, product3_link_id, product4_name_id, product4_link_id,
            privacy_policy_id, terms_of_use_id, sitemap_id,
            product1_name_en, product1_link_en, product2_name_en, product2_link_en,
            product3_name_en, product3_link_en, product4_name_en, product4_link_en,
            privacy_policy_en, terms_of_use_en, sitemap_en,
            product1_name_sd, product1_link_sd, product2_name_sd, product2_link_sd,
            product3_name_sd, product3_link_sd, product4_name_sd, product4_link_sd,
            privacy_policy_sd, terms_of_use_sd, sitemap_sd
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
            db.query(
              insertQuery,
              [
                footer.address_id,
                footer.phone,
                footer.email,
                footer.instagram_name,
                footer.instagram_link,
                footer.website_name,
                footer.website_link,
                footer.address_en,
                footer.address_sd,
                footer.product1_name_id,
                footer.product1_link_id,
                footer.product2_name_id,
                footer.product2_link_id,
                footer.product3_name_id,
                footer.product3_link_id,
                footer.product4_name_id,
                footer.product4_link_id,
                footer.privacy_policy_id,
                footer.terms_of_use_id,
                footer.sitemap_id,
                footer.product1_name_en,
                footer.product1_link_en,
                footer.product2_name_en,
                footer.product2_link_en,
                footer.product3_name_en,
                footer.product3_link_en,
                footer.product4_name_en,
                footer.product4_link_en,
                footer.privacy_policy_en,
                footer.terms_of_use_en,
                footer.sitemap_en,
                footer.product1_name_sd,
                footer.product1_link_sd,
                footer.product2_name_sd,
                footer.product2_link_sd,
                footer.product3_name_sd,
                footer.product3_link_sd,
                footer.product4_name_sd,
                footer.product4_link_sd,
                footer.privacy_policy_sd,
                footer.terms_of_use_sd,
                footer.sitemap_sd,
              ],
              (insertErr) => {
                if (insertErr) {
                  console.error(
                    "❌ Error inserting default footer:",
                    insertErr
                  );
                } else {
                  console.log("✅ Default footer inserted successfully");
                }
              }
            );
          });
        }
      });
    });

    // Create the portfolios table
    const createPortfoliosTableQuery = `
      CREATE TABLE IF NOT EXISTS portfolios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        genre ENUM('Accoustic', 'Dubstep', 'Jazz', 'Pop', 'Progressive', 'Sundanese') NOT NULL,
        link VARCHAR(2083) NOT NULL
      );
    `;

    db.query(createPortfoliosTableQuery, (err) => {
      if (err) {
        console.error("❌ Error creating portfolio table:", err);
      } else {
        console.log("✅ Portfolio table created or already exists");
      }
    });

    // Menyisipkan data awal jika tabel kosong
    const checkDataQuery = "SELECT COUNT(*) AS count FROM portfolios";
    db.query(checkDataQuery, (err, result) => {
      if (err) {
        console.error("❌ Error checking portfolio data:", err);
        return;
      }

      if (result[0].count === 0) {
        const initialData = [
          {
            name: "Dapoer Catering SR",
            genre: "Accoustic",
            link: "https://api.soundcloud.com/tracks/2046389160",
          },
          {
            name: "Goyobod Laris",
            genre: "Dubstep",
            link: "https://api.soundcloud.com/tracks/2046389153",
          },
          {
            name: "Dimsum by Inmons Fix",
            genre: "Jazz",
            link: "https://api.soundcloud.com/tracks/2046389164",
          },
          {
            name: "Bubuk Cabe Pa Abdul",
            genre: "Pop",
            link: "https://api.soundcloud.com/tracks/2046390272",
          },
          {
            name: "Aku Baru",
            genre: "Progressive",
            link: "https://api.soundcloud.com/tracks/2046389156",
          },
          {
            name: "Hudang Hese",
            genre: "Sundanese",
            link: "https://api.soundcloud.com/tracks/2046389168",
          },
        ];

        const insertQuery =
          "INSERT INTO portfolios (name, genre, link) VALUES ?";
        const values = initialData.map((item) => [
          item.name,
          item.genre,
          item.link,
        ]);

        db.query(insertQuery, [values], (err) => {
          if (err) {
            console.error("❌ Error inserting initial data:", err);
          } else {
            console.log("✅ Initial portfolio data inserted");
          }
        });
      }
    });

    // Membuat tabel biodata jika belum ada
    const createBiodataTableQuery = `
      CREATE TABLE IF NOT EXISTS biodata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_id INT,
        email VARCHAR(255),
        name VARCHAR(255),
        whatsapp VARCHAR(255),
        price INT,
        lyrics_text TEXT,
    instrument_text TEXT,
    sound_effect_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (item_id) REFERENCES items(id)
      );
    `;

    db.query(createBiodataTableQuery, (err) => {
      if (err) {
        console.error("❌ Error creating biodata table:", err);
        return;
      }
      console.log("✅ Biodata table created or already exists");
    });

    // Membuat tabel items jika belum ada
    const createItemsTableQuery = `
    CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE
    );
`;

    db.query(createItemsTableQuery, (err) => {
      if (err) {
        console.error("❌ Error creating items table:", err);
        return;
      }
      console.log("✅ Items table created or already exists");

      // Insert default items (if they don't exist)
      const checkItemsQuery = "SELECT COUNT(*) AS count FROM items";
      db.query(checkItemsQuery, (err, result) => {
        if (err) {
          console.error("❌ Error checking items existence:", err);
          return;
        }

        if (result[0].count === 0) {
          // Check if no items exist
          const insertItemsQuery = `
        INSERT INTO items (name) VALUES
        ('lirik'),  -- Correct item names
        ('instrumen'),
        ('efek-suara');
      `;

          db.query(insertItemsQuery, (err) => {
            if (err) {
              console.error("❌ Error inserting default items:", err);
              return;
            }
            console.log("✅ Default items inserted successfully");
          });
        } else {
          console.log(
            "⚠️ Items data already exists, skipping default insertion"
          );
        }
      });
    });
  });
};

async function checkAdminExists(username) {
  try {
    const [result] = await db
      .promise()
      .query("SELECT COUNT(*) AS count FROM admin WHERE username = ?", [
        username,
      ]);
    return result[0].count > 0;
  } catch (err) {
    console.error("❌ Error checking admin existence:", err);
    throw err; // Re-throw error untuk penanganan di fungsi lain
  }
}

async function addAdminUser(username, password, email) {
  try {
    const adminExists = await checkAdminExists(username);

    if (!adminExists) {
      await db
        .promise()
        .query(
          "INSERT INTO admin (username, password, email) VALUES (?, ?, ?)",
          [username, password, email]
        );
      console.log("✅ Admin user added successfully");
    } else {
      console.log("⚠️ Admin user already exists, skipping insertion");
    }
  } catch (err) {
    console.error("❌ Error adding admin user:", err);
    // Tidak perlu re-throw karena error sudah dicatat
  }
}

// Jalankan fungsi untuk memastikan database dan tabel ada
createDatabaseAndTable();

app.post("/admin/login", async (req, res) => {
  const { username, password, recaptchaToken } = req.body;

  if (!username || !password || !recaptchaToken) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  try {
    // Verifikasi reCAPTCHA dengan Google
    const verifyResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: globalThis.process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    const { success, score } = verifyResponse.data;

    if (!success || (score !== undefined && score < 0.5)) {
      return res.status(400).json({ message: "Verifikasi reCAPTCHA gagal." });
    }

    // Cek username dan password di database
    const [rows] = await db
      .promise()
      .query("SELECT * FROM admin WHERE username = ? AND password = ?", [
        username,
        password,
      ]);

    if (rows.length > 0) {
      console.log("Login successful, rows:", rows);
      req.session.user = { username: rows[0].username };
      res.json({ message: "Login berhasil!" });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ message: "Username atau password salah." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// Endpoint Logout
app.post("/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout gagal" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout berhasil" });
  });
});

// Middleware untuk melindungi halaman admin
const requireAdmin = (req, res, next) => {
  console.log("Middleware requireAdmin dipanggil");
  console.log("Session:", req.session);
  if (req.session.user) {
    console.log("Admin terautentikasi");
    next();
  } else {
    console.log("Admin tidak terautentikasi");
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Endpoint yang dilindungi
app.get("/admin/protected", requireAdmin, (req, res) => {
  res.json({ message: "Anda berhasil mengakses halaman admin!" });
});

app.get("/visitors", (req, res) => {
  db.query("SELECT count FROM visitors", (err, result) => {
    if (err) throw err;
    res.json({ count: result[0].count });
  });
});

// Endpoint untuk menambah jumlah pengunjung
app.post("/visitors", (req, res) => {
  db.query("UPDATE visitors SET count = count + 1", (err) => {
    if (err) throw err;
    res.json({ message: "Visitor count updated" });
  });
});

// Endpoint untuk mengambil data header
app.get("/headers", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM headers");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching header data:", error);
    res.status(500).json({ error: "Failed to fetch header data" });
  }
});

// Endpoint untuk memperbarui data header
app.put("/headers/:id", async (req, res) => {
  const { id } = req.params;
  const { position, content_en, content_id, content_sd, path, parent_id } =
    req.body;
  try {
    await db
      .promise()
      .query(
        "UPDATE headers SET position = ?, content_en = ?, content_id = ?, content_sd = ?, path = ?, parent_id = ? WHERE id = ?",
        [position, content_en, content_id, content_sd, path, parent_id, id]
      );
    res.json({ message: "Header updated successfully" });
  } catch (error) {
    console.error("Error updating header data:", error);
    res.status(500).json({ error: "Failed to update header data" });
  }
});

// Endpoint untuk menghapus data header
app.delete("/headers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query("DELETE FROM headers WHERE id = ?", [id]);
    res.json({ message: "Header deleted successfully" });
  } catch (error) {
    console.error("Error deleting header data:", error);
    res.status(500).json({ error: "Failed to delete header data" });
  }
});

// Endpoint untuk mengambil data footer
app.get("/footers", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM footer");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching footer data:", error);
    res.status(500).json({ error: "Failed to fetch footer data" });
  }
});

// Endpoint untuk memperbarui data footer
app.put("/footers/:id", async (req, res) => {
  const { id } = req.params;
  const {
    address_id,
    phone,
    email,
    instagram_name,
    instagram_link,
    website_name,
    website_link,
    address_en,
    product1_name_id,
    product1_link_id,
    product2_name_id,
    product2_link_id,
    product3_name_id,
    product3_link_id,
    product4_name_id,
    product4_link_id,
    product1_name_en,
    product1_link_en,
    product2_name_en,
    product2_link_en,
    product3_name_en,
    product3_link_en,
    product4_name_en,
    product4_link_en,
    address_sd,
    product1_name_sd,
    product1_link_sd,
    product2_name_sd,
    product2_link_sd,
    product3_name_sd,
    product3_link_sd,
    product4_name_sd,
    product4_link_sd,
    privacy_policy_sd,
    terms_of_use_sd,
    sitemap_sd,
  } = req.body;
  try {
    await db.promise().query(
      `UPDATE footer SET 
          address_id = ?, 
          phone = ?, 
          email = ?, 
          instagram_name = ?, 
          instagram_link = ?, 
          website_name = ?, 
          website_link = ?, 
          address_en = ?,
          address_sd = ?,
          product1_name_id = ?, 
          product1_link_id = ?, 
          product2_name_id = ?, 
          product2_link_id = ?, 
          product3_name_id = ?, 
          product3_link_id = ?, 
          product4_name_id = ?, 
          product4_link_id = ?, 
          product1_name_en = ?, 
          product1_link_en = ?, 
          product2_name_en = ?, 
          product2_link_en = ?, 
          product3_name_en = ?, 
          product3_link_en = ?, 
          product4_name_en = ?, 
          product4_link_en = ?,
          product1_name_sd = ?,
          product1_link_sd = ?,
          product2_name_sd = ?,
          product2_link_sd = ?,
          product3_name_sd = ?,
          product3_link_sd = ?,
          product4_name_sd = ?,
          product4_link_sd = ?,
          privacy_policy_sd = ?,
          terms_of_use_sd = ?,
          sitemap_sd = ?
        WHERE id = ?`,
      [
        address_id,
        phone,
        email,
        instagram_name,
        instagram_link,
        website_name,
        website_link,
        address_en,
        address_sd,
        product1_name_id,
        product1_link_id,
        product2_name_id,
        product2_link_id,
        product3_name_id,
        product3_link_id,
        product4_name_id,
        product4_link_id,
        product1_name_en,
        product1_link_en,
        product2_name_en,
        product2_link_en,
        product3_name_en,
        product3_link_en,
        product4_name_en,
        product4_link_en,
        product1_name_sd,
        product1_link_sd,
        product2_name_sd,
        product2_link_sd,
        product3_name_sd,
        product3_link_sd,
        product4_name_sd,
        product4_link_sd,
        privacy_policy_sd,
        terms_of_use_sd,
        sitemap_sd,
        id,
      ]
    );
    res.json({ message: "Footer updated successfully" });
  } catch (error) {
    console.error("Error updating footer data:", error);
    res.status(500).json({ error: "Failed to update footer data" });
  }
});

// Endpoint untuk menghapus data footer
app.delete("/footers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query("DELETE FROM footer WHERE id = ?", [id]);
    res.json({ message: "Footer deleted successfully" });
  } catch (error) {
    console.error("Error deleting footer data:", error);
    res.status(500).json({ error: "Failed to delete footer data" });
  }
});

// Endpoint untuk mengambil data portfolio
app.get("/portfolios", (req, res) => {
  const sql = "SELECT * FROM portfolios";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error fetching portfolios:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});

// Endpoint untuk menambahkan data portfolio baru
app.post("/portfolios", (req, res) => {
  const { name, genre, link } = req.body;

  if (!name || !genre || !link) {
    return res.status(400).json({ error: "Incomplete portfolio data!" });
  }

  const sql = "INSERT INTO portfolios (name, genre, link) VALUES (?, ?, ?)";
  db.query(sql, [name, genre, link], (err, result) => {
    if (err) {
      console.error("❌ Error creating portfolio:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: result.insertId,
      name,
      genre,
      link,
    });
  });
});

// Endpoint untuk mengupdate data portfolio
app.put("/portfolios/:id", (req, res) => {
  const { name, genre, link } = req.body;
  const { id } = req.params;

  if (!name || !genre || !link) {
    return res.status(400).json({ error: "Incomplete portfolio data!" });
  }

  const sql =
    "UPDATE portfolios SET name = ?, genre = ?, link = ? WHERE id = ?";
  db.query(sql, [name, genre, link, id], (err) => {
    if (err) {
      console.error("❌ Error updating portfolio:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Portfolio updated successfully" });
  });
});

// Endpoint untuk menghapus data portfolio
app.delete("/portfolios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM portfolios WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ Error deleting portfolio:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Portfolio deleted successfully" });
  });
});

// Endpoint untuk mengambil data items
app.get("/items", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      res.status(500).json({ error: "Failed to fetch items" });
      return;
    }
    res.status(200).json(result);
  });
});

// Endpoint untuk menyimpan biodata
app.post("/biodata", (req, res) => {
  const {
    item_id,
    email,
    name,
    whatsapp,
    price,
    lyrics,
    instrument,
    soundEffect,
  } = req.body;

  let lyricsText = null;
  let instrumentText = null;
  let soundEffectText = null;

  // Tentukan kolom mana yang akan diisi berdasarkan item_id
  db.query("SELECT name from items where id = ?", [item_id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal memilih item name", error: err.message });
    }
    const itemName = result[0].name;

    if (itemName === "lirik") {
      lyricsText = lyrics;
    } else if (itemName === "instrumen") {
      instrumentText = instrument;
    } else if (itemName === "efek-suara") {
      soundEffectText = soundEffect;
    }

    const sql =
      "INSERT INTO biodata (item_id, email, name, whatsapp, price, lyrics_text, instrument_text, sound_effect_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      sql,
      [
        item_id,
        email,
        name,
        whatsapp,
        price,
        lyricsText,
        instrumentText,
        soundEffectText,
      ],
      (err, result) => {
        if (err) {
          console.error("❌ Error saving biodata:", err);
          return res.status(500).json({
            message: "Gagal menyimpan data biodata.",
            error: err.message,
          });
        }
        console.log("✅ Biodata inserted:", result.insertId);
        res.status(200).json({ message: "Data biodata berhasil disimpan." });
      }
    );
  });
});

app.delete("/biodata/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM biodata WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ Error deleting biodata:", err);
      return res.status(500).json({ error: "Gagal menghapus data biodata." });
    }
    res.status(200).json({ message: "Data biodata berhasil dihapus." });
  });
});

app.get("/biodata/count", (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM biodata";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error fetching biodata count:", err);
      return res
        .status(500)
        .json({ error: "Gagal mengambil jumlah data biodata" });
    }
    res.status(200).json({ count: result[0].count });
  });
});

// Endpoint untuk mengambil data biodata dengan nama item (bergabung dengan tabel items)
app.get("/biodata", (req, res) => {
  const itemId = req.query.item_id; // Ambil item_id dari query parameter
  const itemName = req.query.item_name; // Ambil item_name dari query parameter

  let sql = `
      SELECT 
    b.id,
    b.item_id,
    i.name AS item_name,
    b.email,
    b.name,
    b.whatsapp,
    b.price,
    b.created_at,
    b.lyrics_text,
    b.instrument_text,
    b.sound_effect_text
FROM biodata b
INNER JOIN items i ON b.item_id = i.id

  `;

  if (itemName) {
    sql += ` WHERE i.name = ?`;
  }

  if (itemId) {
    sql += ` WHERE i.name = ?`;
  }

  db.query(sql, [itemId], (err, result) => {
    // Masukkan itemId ke query
    if (err) {
      console.error("❌ Error fetching biodata:", err);
      return res.status(500).json({ error: "Failed to fetch biodata" });
    }
    res.status(200).json(result);
  });
});

app.get("/orders/:productId", (req, res) => {
  const productId = req.params.productId;
  const sql = "SELECT COUNT(*) AS count FROM biodata WHERE item_id = ?"; // Ganti product_id dengan nama kolom yang sesuai di tabel biodata Anda.

  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error("❌ Error fetching order count:", err);
      return res.status(500).json({ error: "Failed to fetch order count" });
    }
    res.json({ orderCount: result[0].count });
  });
});

app.get("/biodata/categories/count", (req, res) => {
  const categories = ["lirik", "instrumen", "efek-suara"];
  const results = [];

  const processCategory = (category, callback) => {
    const sql = `
          SELECT COUNT(*) AS jumlah_terjual
          FROM biodata b
          INNER JOIN items i ON b.item_id = i.id
          WHERE i.name = ?
      `;

    db.query(sql, [category], (err, result) => {
      if (err) {
        console.error(`❌ Error fetching ${category} sales count:`, err);
        return callback(err);
      }
      results.push({
        nama_produk: category,
        jumlah_terjual: result[0].jumlah_terjual,
      });
      callback(null);
    });
  };

  const processCategories = (index) => {
    if (index < categories.length) {
      processCategory(categories[index], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Failed to fetch category sales count" });
        }
        processCategories(index + 1);
      });
    } else {
      res.status(200).json({ produk: results });
    }
  };

  processCategories(0);
});

// Endpoint untuk mengambil semua FAQ
app.get("/faq", (req, res) => {
  const sql = "SELECT * FROM faq";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error fetching FAQs:", err);
      return res.status(500).json({ error: "Failed to fetch FAQs" });
    }
    res.status(200).json(result);
  });
});

// Endpoint untuk menambahkan FAQ baru
app.post("/faq", (req, res) => {
  const {
    question_id,
    answer_id,
    question_en,
    answer_en,
    question_sd,
    answer_sd,
    status,
  } = req.body;

  if (status !== "Published" && status !== "Archived") {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const sql =
    "INSERT INTO faq (question_id, answer_id, question_en, answer_en, question_sd, answer_sd, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      question_id,
      answer_id,
      question_en,
      answer_en,
      question_sd,
      answer_sd,
      status,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error creating FAQ:", err);
        return res.status(500).json({ error: "Failed to create FAQ" });
      }
      res
        .status(201)
        .json({ message: "FAQ created successfully", id: result.insertId });
    }
  );
});

// Endpoint untuk mengupdate FAQ
app.put("/faq/:id", (req, res) => {
  const {
    question_id,
    answer_id,
    question_en,
    answer_en,
    question_sd,
    answer_sd,
    status,
  } = req.body;
  const { id } = req.params;

  if (status !== "Published" && status !== "Archived") {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const sql =
    "UPDATE faq SET question_id = ?, answer_id = ?, question_en = ?, answer_en = ?, question_sd = ?, answer_sd = ? status = ? WHERE id = ?";
  db.query(
    sql,
    [
      question_id,
      answer_id,
      question_en,
      answer_en,
      question_sd,
      answer_sd,
      status,
      id,
    ],
    (err) => {
      if (err) {
        console.error("❌ Error updating FAQ:", err);
        return res.status(500).json({ error: "Failed to update FAQ" });
      }
      res.status(200).json({ message: "FAQ updated successfully" });
    }
  );
});

// Endpoint untuk menghapus FAQ
app.delete("/faq/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM faq WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ Error deleting FAQ:", err);
      return res.status(500).json({ error: "Failed to delete FAQ" });
    }
    res.status(200).json({ message: "FAQ deleted successfully" });
  });
});

// Inisialisasi Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: globalThis.process.env.MIDTRANS_SERVER_KEY,
});

app.post("/api/payments/process-transaction", async (req, res) => {
  try {
    console.log("Incoming Request:", req.body); // ✅ Cek data yang masuk

    const { id, productName, price } = req.body;
    if (!id || !productName || !price) {
      console.error("❌ Missing required fields:", req.body);
      return res
        .status(400)
        .json({ status: "error", message: "Missing required fields" });
    }

    console.log("✅ Processing transaction with:", { id, productName, price });

    const parameter = {
      transaction_details: {
        order_id: `${id}-${Date.now()}`, // Gunakan order ID unik
        gross_amount: price,
      },
      item_details: [
        {
          id: id,
          price: price,
          quantity: 1,
          name: productName,
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    console.log("✅ Sending request to Midtrans with:", parameter);

    const token = await snap.createTransactionToken(parameter);
    console.log("✅ Midtrans Token Received:", token);

    res.status(200).json({ status: "success", token });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = globalThis.process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
