// ignore_for_file: prefer_collection_literals

import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:real_estate/const/app.dart';

class GoogleMaps {
  static CameraPosition getPropertyLocation(var lat, var long) {
    return CameraPosition(
      target: LatLng(lat, long),
      zoom: 11,
    );
  }
}

// ignore: must_be_immutable
class GoogleMapsItem extends StatefulWidget {
  double latitude;
  double longtitude;

  GoogleMapsItem({super.key, required this.latitude, required this.longtitude});

  @override
  State<GoogleMapsItem> createState() => _GoogleMapsItemState();
}

class _GoogleMapsItemState extends State<GoogleMapsItem> {
  final Completer<GoogleMapController> _controller = Completer();
  BitmapDescriptor? customMarkerIcon;

  @override
  void initState() {
    super.initState();

    _createCustomMarkerIcon();
  }

  Future<void> _createCustomMarkerIcon() async {
    customMarkerIcon = await BitmapDescriptor.fromAssetImage(
        const ImageConfiguration(), AppAssets.mapMarker
        //  "assets/mapMarker.png",
        );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: _createCustomMarkerIcon(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return GoogleMap(
            mapType: MapType.normal,
            indoorViewEnabled: true,
            myLocationEnabled: true,
            // myLocationButtonEnabled: true,
            initialCameraPosition: GoogleMaps.getPropertyLocation(
                widget.latitude, widget.longtitude),
            onMapCreated: (GoogleMapController controller) {
              _controller.complete(controller);
            },
            gestureRecognizers: Set()
              ..add(Factory<OneSequenceGestureRecognizer>(
                  () => EagerGestureRecognizer())),
            markers: {
              Marker(
                markerId: const MarkerId('customMarker'),
                position: LatLng(widget.latitude, widget.longtitude),
                icon: customMarkerIcon != null
                    ? customMarkerIcon!
                    : BitmapDescriptor.defaultMarker,
              ),
            },
          );
        } else {
          // Show a loading indicator while the custom marker icon is loading
          return Container();
        }
      },
    );
  }
}
