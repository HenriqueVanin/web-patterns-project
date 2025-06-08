// Pronuncia o texto de acordo com o idioma do elemento
function textToSpeech(text, element)
{
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = element.lang
    speechSynthesis.speak(utterance);
}

// Muda o idioma do elemento
function changeLanguage(lang, element)
{
    element.lang = lang;
}

// Verifica quais idiomas estão disponíveis
function checkAvailableLanguages()
{
    const availableLanguages = speechSynthesis.getVoices().map(voice => voice.lang);
    return Array.from(new Set(availableLanguages));
}