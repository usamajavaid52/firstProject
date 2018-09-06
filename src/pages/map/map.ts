import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import * as mqtt from "mqtt";

import { Geolocation } from "@ionic-native/geolocation";
import { CallNumber } from "@ionic-native/call-number";
import { GlobalService } from "../services/globalServices";
declare var google;

@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  topBar: string = "details";
  client: any;
  totalMarkers: any;
  order: any;
  driverStat: boolean = false;
  driverPhone: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public callNumber: CallNumber,
    public service: GlobalService
  ) {
    this.order = navParams.data.order;
    console.log("Order", this.order);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MapPage");
    this.totalMarkers = [];

    this.loadMap(this.totalMarkers, this.map, this.order, this.client);
  }

  loadMap(markers, map, order, client) {
    var inc = 0;
    let latLng = new google.maps.LatLng(33.6128524, 73.0707744);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      minZoom: 6
    };

    map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    client = mqtt.connect("ws://144.217.164.222:8083", {
      clean: true,
      username: "p@kistan",
      password: "p@kistan"
    });

    client.subscribe(order.id);
    console.log(client.subscribe(order.id));
    client.on("message", (topic, payload) => {
      if (inc == 0) {
        var dataPhone = JSON.parse(payload);
        this.driverPhone = dataPhone.phone;
        console.log("Delivering Order", this.driverPhone);
        inc++;
      }

      if (topic == order.id) {
        // this.status = true;

        var data = JSON.parse(payload);

        this.driverStat = true;
        if (this.driverStat && data.status == "rideGoing") {
          var el = <HTMLInputElement>document.getElementById("driverStatus");
          el.disabled = false;
        } else if (data.status == "rideEnd") {
          var el = <HTMLInputElement>document.getElementById("driverStatus");
          el.disabled = true;
        }

        if (data.status == "rideGoing") {
          var index = markers.findIndex(obj => obj.email === data.email);
          if (index == -1) {
            var marker = new google.maps.Marker({
              map: map,
              label: data.email.substr(0, 1)
            });
            marker.email = data.email;
            var latlng = new google.maps.LatLng(data.latitude, data.longitude);
            marker.setPosition(latlng);
            var contentString =
              "<div>" +
              "<h2>" +
              data.email +
              "</h2>" +
              "<h4>" +
              data.email +
              "</h4>" +
              "<br/>";
            "</div>";

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            marker.addListener("click", function() {
              infowindow.open(map, marker);
            });

            markers.push(marker);
          } else {
            var deltalat =
              (data.latitude - markers[index].position.lat()) / 100;
            var deltalng =
              (data.longitude - markers[index].position.lng()) / 100;
            var delay = 10 * 0.5;
            for (var i = 0; i < 100; i++) {
              (function(ind) {
                setTimeout(function() {
                  var lat = markers[index].position.lat();
                  var lng = markers[index].position.lng();
                  lat += deltalat;
                  lng += deltalng;
                  var latlng = new google.maps.LatLng(lat, lng);
                  markers[index].setPosition(latlng);
                  map.panTo(latlng);
                }, delay * ind);
              })(i);
            }
          }
        } else if (data.status == "rideEnd") {
          console.log("Ride Ended");
          this.driverStat = false;
          if (!this.driverStat) {
            var el = <HTMLInputElement>document.getElementById("driverStatus");
            el.disabled = true;
          }
          var index = markers.findIndex(obj => obj.email === data.email);
          // console.log("Ride Ends now", index, "and", markers);
          markers[index].setMap(null);
          // console.log("this.client", client);
          client.unsubscribe(order.id, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(res);
            }
          });
          client.end();
        }
      }
    });
  }
  callDriver() {
    console.log("Driver Number", this.driverPhone);
    this.callNumber
      .callNumber(this.driverPhone, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }
  back() {
    this.viewCtrl.dismiss();
  }
}
