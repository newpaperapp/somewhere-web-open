/*
 * Somewhere Open — browser-language copy for the app-link fallback pages.
 * The pages deliberately have no language picker or persisted preference:
 * each visit follows the browser's preferred language order.
 */
(function () {
  "use strict";

  const DEFAULT_LANGUAGE = "en";
  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

  const strings = Object.freeze({
    ko: {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere — 초대 열기",
      "action.continue": "Somewhere로 계속하기",
      "openInvitation.description":
        "앱이 열리지 않았다면 Somewhere를 설치한 뒤 초대로 돌아와 주세요",
      "openInvitation.download": "앱 다운로드",
      "openInvitation.return": "초대로 돌아가기",
    },
    en: {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere — Open Invitation",
      "action.continue": "Continue to Somewhere",
      "openInvitation.description":
        "If the app did not open, install Somewhere and return to the invitation",
      "openInvitation.download": "Download App",
      "openInvitation.return": "Return to Invitation",
    },
    ja: {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere — 招待を開く",
      "action.continue": "Somewhereへ進む",
      "openInvitation.description":
        "アプリが開かなかった場合は、Somewhereをインストールして招待に戻ってください",
      "openInvitation.download": "アプリをダウンロード",
      "openInvitation.return": "招待に戻る",
    },
    "zh-CN": {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere — 打开邀请",
      "action.continue": "前往 Somewhere",
      "openInvitation.description": "如果应用没有打开，请安装 Somewhere 后返回邀请",
      "openInvitation.download": "下载应用",
      "openInvitation.return": "返回邀请",
    },
    "zh-TW": {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere — 開啟邀請",
      "action.continue": "前往 Somewhere",
      "openInvitation.description": "如果 App 沒有開啟，請安裝 Somewhere 後返回邀請",
      "openInvitation.download": "下載 App",
      "openInvitation.return": "返回邀請",
    },
    fr: {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere — Ouvrir l’invitation",
      "action.continue": "Continuer vers Somewhere",
      "openInvitation.description":
        "Si l’app ne s’est pas ouverte, installez Somewhere puis revenez à l’invitation",
      "openInvitation.download": "Télécharger l’app",
      "openInvitation.return": "Revenir à l’invitation",
    },
    de: {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere – Einladung öffnen",
      "action.continue": "Weiter zu Somewhere",
      "openInvitation.description":
        "Wenn sich die App nicht geöffnet hat, installiere Somewhere und kehre zur Einladung zurück",
      "openInvitation.download": "App herunterladen",
      "openInvitation.return": "Zur Einladung zurück",
    },
    es: {
      "brand.name": "Somewhere",
      "page.openInvitation": "Somewhere — Abrir invitación",
      "action.continue": "Ir a Somewhere",
      "openInvitation.description":
        "Si la app no se abrió, instala Somewhere y vuelve a la invitación",
      "openInvitation.download": "Descargar la app",
      "openInvitation.return": "Volver a la invitación",
    },
  });

  function resolveLanguage(locale) {
    if (typeof locale !== "string") return null;

    const normalized = locale.trim().replace(/_/g, "-").toLowerCase();
    if (!normalized) return null;

    if (normalized === "zh" || normalized.startsWith("zh-")) {
      return /^zh-(?:hant|tw|hk|mo)(?:-|$)/.test(normalized) ? "zh-TW" : "zh-CN";
    }

    const language = normalized.split("-", 1)[0];
    return hasOwn(strings, language) ? language : null;
  }

  function detectLanguage(languages) {
    const preferredLanguages = Array.isArray(languages) ? languages : [languages];
    return preferredLanguages.map(resolveLanguage).find(Boolean) || DEFAULT_LANGUAGE;
  }

  function browserLanguages() {
    const browserNavigator = typeof navigator === "undefined" ? {} : navigator;
    const languages = Array.isArray(browserNavigator.languages)
      ? browserNavigator.languages
      : [];

    return [...languages, browserNavigator.language];
  }

  function applyLanguage(language = detectLanguage(browserLanguages())) {
    const resolvedLanguage = hasOwn(strings, language)
      ? language
      : DEFAULT_LANGUAGE;
    const dictionary = strings[resolvedLanguage];

    document.documentElement.lang = resolvedLanguage;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = dictionary[key];
      if (value != null) element.textContent = value;
    });

    return resolvedLanguage;
  }

  window.SomewhereOpenI18n = Object.freeze({
    detectLanguage,
    applyLanguage,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyLanguage(), { once: true });
  } else {
    applyLanguage();
  }
})();
