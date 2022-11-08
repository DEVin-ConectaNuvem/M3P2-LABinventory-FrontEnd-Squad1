import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";
import ptBr  from './langs/pt-br'
import en from './langs/en'

i18next.use(LanguageDetector).init({
  debug: true,
  fallbackLng: "pt_BR",
  resources: {
    pt_BR: {
        translation: ptBr
    },
    en: {
        translation: en
    }
  },
});

export default function (app) {
  app.use(I18NextVue, { i18next });
  return app;
}
