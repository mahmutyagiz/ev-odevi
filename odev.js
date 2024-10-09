// Çalışanları tutacağımız dizi
let calisanlar = [];

// Çalışan Ekleme Fonksiyonu
function calisanEkle() {
    let isim = document.getElementById("isim").value;
    let yas = parseInt(document.getElementById("yas").value);
    let departman = document.getElementById("departman").value;
    let maas = parseInt(document.getElementById("maas").value);

    // Koşullar
    if (isim === "" || yas < 18 || yas < 0 || maas <= 0) {
        alert("Lütfen geçerli bilgiler girin.");
        return;
    }

    // Aynı isimde çalışan var mı?
    let mevcutCalisan = calisanlar.find(calisan => calisan.isim === isim);
    if (mevcutCalisan) {
        alert("Bu isimde bir çalışan zaten mevcut.");
        return;
    }

    // Yeni çalışanı ekle
    calisanlar.push({ isim, yas, departman, maas });
    alert("Çalışan başarıyla eklendi!");
    temizle();
}

// Çalışan Güncelleme Fonksiyonu
function calisanGuncelle() {
    let guncelleIsim = document.getElementById("guncelleIsim").value;
    let yeniDepartman = document.getElementById("yeniDepartman").value;
    let yeniMaas = parseInt(document.getElementById("yeniMaas").value);

    // Çalışanı bul
    let calisan = calisanlar.find(calisan => calisan.isim === guncelleIsim);
    if (!calisan) {
        alert("Çalışan bulunamadı.");
        return;
    }

    // Bilgileri güncelle
    if (yeniDepartman !== "") calisan.departman = yeniDepartman;
    if (yeniMaas > 0) calisan.maas = yeniMaas;
    alert("Çalışan başarıyla güncellendi!");
    temizle();
}

// Çalışan Silme Fonksiyonu
function calisanSil() {
    let silIsim = document.getElementById("silIsim").value;

    // Çalışanı bul ve sil
    let index = calisanlar.findIndex(calisan => calisan.isim === silIsim);
    if (index === -1) {
        alert("Çalışan bulunamadı.");
        return;
    }

    calisanlar.splice(index, 1);
    alert("Çalışan başarıyla silindi!");
    temizle();
}

// Çalışan Listeleme Fonksiyonu
function calisanListele() {
    let listelemeTuru = document.getElementById("listelemeTuru").value;
    let sonucDiv = document.getElementById("sonuc");
    sonucDiv.innerHTML = "";

    if (listelemeTuru === "tum") {
        if (calisanlar.length === 0) {
            sonucDiv.innerHTML = "Listelenecek çalışan yok.";
        } else {
            calisanlar.forEach(calisan => {
                sonucDiv.innerHTML += `${calisan.isim}, ${calisan.departman}, ${calisan.maas} TL<br>`;
            });
        }
    } else if (listelemeTuru === "departman") {
        let departman = document.getElementById("departmanListe").value;
        let departmanCalisanlari = calisanlar.filter(calisan => calisan.departman === departman);
        if (departmanCalisanlari.length === 0) {
            sonucDiv.innerHTML = "Bu departmanda çalışan bulunmamaktadır.";
        } else {
            departmanCalisanlari.forEach(calisan => {
                sonucDiv.innerHTML += `${calisan.isim}, ${calisan.departman}, ${calisan.maas} TL<br>`;
            });
        }
    } else if (listelemeTuru === "maasArtan") {
        let siraliCalisanlar = calisanlar.slice().sort((a, b) => a.maas - b.maas);
        siraliCalisanlar.forEach(calisan => {
            sonucDiv.innerHTML += `${calisan.isim}, ${calisan.maas} TL<br>`;
        });
    } else if (listelemeTuru === "maasAzalan") {
        let siraliCalisanlar = calisanlar.slice().sort((a, b) => b.maas - a.maas);
        siraliCalisanlar.forEach(calisan => {
            sonucDiv.innerHTML += `${calisan.isim}, ${calisan.maas} TL<br>`;
        });
    } else if (listelemeTuru === "maasFiltresi") {
        let filtreliCalisanlar = calisanlar.filter(calisan => calisan.maas < 5000);
        if (filtreliCalisanlar.length === 0) {
            sonucDiv.innerHTML = "5000 TL'nin altında maaşı olan çalışan yok.";
        } else {
            filtreliCalisanlar.forEach(calisan => {
                sonucDiv.innerHTML += `${calisan.isim}, ${calisan.maas} TL<br>`;
            });
        }
    }
}

// Formu temizle
function temizle() {
    document.getElementById("isim").value = "";
    document.getElementById("yas").value = "";
    document.getElementById("departman").value = "";
    document.getElementById("maas").value = "";
    document.getElementById("guncelleIsim").value = "";
    document.getElementById("yeniDepartman").value = "";
    document.getElementById("yeniMaas").value = "";
    document.getElementById("silIsim").value = "";
    document.getElementById("departmanListe").value = "";
}
