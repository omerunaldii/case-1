import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";

const fallbackLng = ['en'];
const availableLanguages = ['en', 'tr'];

const resources = {
  'en': {
    translation: {
      "HOME": "Home",
      "CONTACT_US": "Contact Us",
      "FULL_NAME": "Full Name",
      "EMAIL": "Email",
      "PASSWORD": "Password",
      "PHONE": "Phone Number",
      "LOGIN": "Login",
      "LOGOUT": "Logout",
      "COUNTRY": "Country",
      "MESSAGE": "Message",
      "SEND": "Send",
      "SELECT": "Select",
      "FULL_NAME_ERROR_1": "Invalid full name",
      "EMAIL_ERROR_1": "Invalid email address",
      "PASSWORD_ERROR_1": "Password field can not be empty",
      "PHONE_ERROR_1": "Invalid phone number",
      "LOREM": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "TURKEY": "Turkey",
      "USA": "United States of America",
      "UK": "United Kingdom",
      "GERMANY": "Germany",
      "SWEDAN": "Sweden",
      "KENYA": "Kenya",
      "BRAZIL": "Brazil",
      "ZIMBABWE": "Zimbabwe",
      "TURKISH": "Turkish",
      "ENGLISH": "English"
    }
  },
  'tr': {
    translation: {
      "HOME": "Anasayfa",
      "CONTACT_US": "Bize Ulaşın",
      "FULL_NAME": "Ad Soyad",
      "EMAIL": "E-posta",
      "PASSWORD": "Şifre",
      "PHONE": "Telefon Numarası",
      "LOGIN": "Giriş yap",
      "LOGOUT": "Çıkış yap",
      "COUNTRY": "Ülke",
      "MESSAGE": "Mesaj",
      "SEND": "Gönder",
      "SELECT": "Seçiniz",
      "FULL_NAME_ERROR_1": "Geçersiz isim",
      "EMAIL_ERROR_1": "Geçersiz eposta adresi",
      "PASSWORD_ERROR_1": "Şifre alanı boş olamaz",
      "PHONE_ERROR_1": "Geçersiz telefon numarası",
      "LOREM": "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.",
      "TURKEY": "Türkiye",
      "USA": "Amerika Birleşik Devletleri",
      "UK": "İngiltere",
      "GERMANY": "Almanya",
      "SWEDAN": "İsveç",
      "KENYA": "Kenya",
      "BRAZIL": "Brezilya",
      "ZIMBABWE": "Zimbabve",
      "TURKISH": "Türkçe",
      "ENGLISH": "İngilizce"
    }
  }
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
