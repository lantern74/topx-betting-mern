# Task 5: React Internationalization (i18n)

## Objective

Integrate internationalization (i18n) into the React application to support multiple languages. The initial implementation should include Chinese (default) and English (fallback) translations.

## Requirements

1. **Libraries:** Use `i18next` and `react-i18next` for internationalization. Install them using bun:

    ```bash
    bun add i18next react-i18next i18next-browser-languagedetector
    ```

2. **Translation File:**

    *   Create a single JSON file named `locales.json` in the `frontend/public` directory to store translations for both languages.
    *   Use the existing Chinese text found in the JSX and JS files as the basis for the Chinese translations.
    *   Translate the Chinese text to English for the English translations.
    *   Organize the JSON structure with language codes (`zh` for Chinese, `en` for English) as top-level keys, and nested objects for namespaces and keys.

3. **i18n Configuration:**

    *   Create a file named `i18n.js` in the `frontend/src` directory to configure `i18next`.
    *   Initialize `i18next` to use `LanguageDetector` to detect user language.
    *   Set Chinese (`zh`) as the default language and English (`en`) as the fallback language.
    *   Load translations from `locales.json`.
    *   Enable debugging during development.
    *   Configure `i18next` to use `localStorage` to store the selected language.

4. **Component Updates:**

    *   Modify components to use the `useTranslation` hook from `react-i18next` to dynamically render translated text.
    *   Replace all static Chinese text in components with translation keys.

5. **Language Selector:**

    *   Create a new `LanguageSelector` component that allows users to switch between Chinese and English.
    *   Store the selected language in `localStorage`.
    *   Integrate this component into a new route at `/developer/language`.

6. **Do not change the pages styles at all.**

## File Changes

### `frontend/src/i18n.js` (New File)

This file initializes and configures `i18next`.

### `frontend/public/locales.json` (New File)

This file contains all the translations in JSON format.

### `frontend/src/index.js`

Wrap the `App` component with `I18nextProvider` to make translations available throughout the application.

### `frontend/src/components/pages/Landing.jsx` - Done

### `frontend/src/components/pages/HeroBanner.jsx` - Done

### `frontend/src/components/pages/Explore.jsx` - Done

### `frontend/src/components/pages/Analysis.jsx` - Done

### `frontend/src/components/pages/HowWorks.jsx` - Done

### `frontend/src/components/pages/CounterOne.jsx` - Done

### `frontend/src/components/pages/CommonCounter.jsx` - Done

### `frontend/src/components/pages/MultiPlatform.jsx` - Done

### `frontend/src/components/pages/PortfolioGallery.jsx` - Done

### `frontend/src/components/pages/Contact.jsx`

Replace static text with dynamic translations using the `t` function from `useTranslation`.

### `frontend/src/components/header/TopNav.jsx`

Replace static text with dynamic translations using the `t` function from `useTranslation`.

### `frontend/src/components/header/MobileMenu.jsx` - Done

### `frontend/src/components/header/ThemeMainMenu.jsx` - Done

### `frontend/src/components/form/Login.jsx`

Replace static text with dynamic translations using the `t` function from `useTranslation`.

### `frontend/src/components/form/LoginForm.jsx`

Replace static text with dynamic translations using the `t` function from `useTranslation`.

### `frontend/src/components/matches/ViewMatches.jsx` - Done

### `frontend/src/components/matches/MatchResult.jsx` - Done

### `frontend/src/components/matches/MatchResultFullCard/index.jsx`

Replace static text with dynamic translations using the `t` function from `useTranslation`.

### `frontend/src/components/developer/DeveloperPage.jsx` (Modified File)

Add the `LanguageSelector` component to this page.

### `frontend/src/components/developer/LanguageSelector.jsx` (New File)

Create the language selector component.

### `frontend/src/router/AppRouter.js`

Add a new route for the `/developer/language` page.
