const express = require('express');
const app = express();
const fs = require('fs'); // Modul untuk membaca file
const path = require('path');
const port = 3000;

// Endpoint untuk merender halaman utama (index.html)
app.get('/', (req, res) => {
    // Baca file HTML dari sistem file
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Terjadi kesalahan.');
        } else {
            // Baca file CSS dari sistem file
            fs.readFile(path.join(__dirname, 'style.css'), 'utf8', (err, css) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Terjadi kesalahan.');
                } else {
                    // Gabungkan file HTML dan CSS ke dalam satu respons
                    const fullHTML = `
                        <!DOCTYPE html>
                        <html lang="id">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta name="description" content="Layanan Data Scraping dan Analisis untuk Bisnis Anda. Konsultasi dan Pemesanan Layanan Data Scraping, Marketplace, dan Analisis Data.">
                            <meta name="keywords" content="data scraping, jasa data, marketplace data, analisis data, web scraping, scraping otomatis">
                            <meta name="author" content="Ignasius">
                            <title>Layanan Data Scraping & Analisis</title>
                            <style>${css}</style>
                        </head>
                        <body>
                            ${html}
                        </body>
                        </html>
                    `;
                    // Setel header tipe konten sebagai HTML
                    res.setHeader('Content-Type', 'text/html');
                    // Kirim file HTML dan CSS sebagai respons
                    res.send(fullHTML);
                }
            });
        }
    });
});

// Jalankan server pada port 3000
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
