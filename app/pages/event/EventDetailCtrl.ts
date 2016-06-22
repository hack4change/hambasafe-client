import { Component, OnInit } from '@angular/core';
import {EventService} from "./EventService";

export class EventDetailCtrl implements OnInit {
  eventData: any = {};
  attendingDescription: string;
  constructor($location, private eventService: EventService) {

    // $scope.eventData = {
    //     attending: false,
    //     location: "CAPE TOWN, RONDEBOSH",
    //     title: "Cycling in numbers",
    //     type: "CYCLE",
    //     distance: "5KM",
    //     level: "NOVICE",
    //     date: "20 November 2015",
    //     summary: "This is a 'Facebook' styled Card. The header is created from a Thumbnail List item,        the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer.",
    //     numberOfAttendees: "4"
    // }
  }
  ngOnInit() {
    this.eventService.getEvent({ id: 3 })
      , function (event) {
        this.eventData = event;
        console.log(event);
      };

    this.attendingDescription = "JOIN";
    if (this.eventData.attending) {
      this.attendingDescription = "CANCEL"
    }
  }

  doAttend() {
    this.eventData.attending = !this.eventData.attending;
    this.attendingDescription = "JOIN";
    if (this.eventData.attending) {
      this.attendingDescription = "CANCEL"
    }
  }

}
