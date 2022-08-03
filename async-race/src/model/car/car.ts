export default class Car {
  model: string;

  color: string;

  constructor(model: string, color: string) {
    this.model = model;
    this.color = color;
  }

  start() {
    requestAnimationFrame(() => 20);
    //работа с апи: запускаем двигатель в режим Started (отправляем реквест на Engine со статусом старт и id машины)
    //получаем в респонс параметы (ск-сть, дистанция), отправляем реквест drive
    //получаем респонс со статусом 200(ок. едем) или 500(стоп. ловим ошбику, останавливаем машину)
  }

  stop() {
    //сбрасываем статус на stopped
  }


}
//сперва Старт, потом Драйв
//генерировать как карточки товара 