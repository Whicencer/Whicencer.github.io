const tg = window.Telegram.WebApp;
const subscriptions = document.querySelectorAll('.sub_level');
let currentSub = null;

tg.expand();
const mainButton = tg.MainButton;
mainButton.text = "Buy course";
mainButton.disable();
mainButton.show();

subscriptions.forEach(sub => {
  sub.addEventListener("change", () => {
    currentSub = sub.querySelector("input").id;
    mainButton.enable();
  });
});

mainButton.onClick(() => {
  const currentSubName = currentSub === "month" ? "Basic" : "Pro";
  tg.sendData(`Поздравляю с приобретением ${currentSubName} подписки`);
  tg.close();
});