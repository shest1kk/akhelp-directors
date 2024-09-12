const tg = window.Telegram.WebApp;
tg.isExpanded;
tg.expand();
tg.enableClosingConfirmation();

export function useTelegram() {
    return {
        tg,
        user: tg.initDataUnsafe?.user,
    };
}
