export class LatestComponent{
  constructor(private $location) {

  }

  goCreateAnEvent = function () {
    this.$location.path('app/registration');
  }

  goHambaSafe = function () {
    this.$location.path('app/eventdetail/TEMP');
  }
}
