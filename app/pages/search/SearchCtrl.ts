export class SearchCtrl {
  eventType;
  typeSelected;
  selectedSearch;
  eventsToList;
  shownGroup;
  constructor(private $stateParams, private EventService, private $location) {
   
    this.eventType = ["Event Type"];
    this.typeSelected = this.eventType[0];
    this.selectedSearch = 0;
    if ($stateParams.lat && $stateParams.lng && $stateParams.dist) {
      this.selectedSearch = 1;
    }
    this.eventsToList = []

    this.searchEvents();
    this.getTypes();
  }
    getTypes  () {

     this.EventService.getEventTypes().then(function (response) {

        this.eventTypes = [];
        for (var i = 0; i < response.data.length; i++) {
          this.eventTypes.push(response.data[i].Name);
        }
        console.log(this.eventTypes)
      }, function (response) {
        console.log("error");
        console.log(response);
      });
    }
   

    toggleGroup = function (group) {
      if (this.isGroupShown(group)) {
        this.shownGroup = null;
      } else {
        this.shownGroup = group;
      }
    }
    toggleSelection  (selected, group) {
      this.typeSelected = selected;
      this.toggleGroup(group);
    }

    isGroupShown  (type, group) {
      return this.shownGroup === group && this.typeSelected !== type;
    }
    isShown (type, group) {
      return this.shownGroup === group && this.typeSelected !== type;
    }
    setActiveSearch  (selection) {
      this.selectedSearch = selection;
    }
    activeSearch  (selection) {
      return this.selectedSearch === selection;
    }
    filterResults  (eventObject) {
      if (this.typeSelected == "Event Type") {
        return true;
      } else {
        if (this.typeSelected == eventObject.EventType.Name) {
          return true;
        } else {
          return false;
        }
      }
    }
    
  
  goMap = function () {
   this.$location.path('app/map');
  }
  searchEvents  () {
    var searchBy = this.selectedSearch;
    this.EventService.getAllEvents().then(function (response) {
      this.eventsToList = response.data;
      console.log(response);
    }, function (response) {

    });
  }
}
