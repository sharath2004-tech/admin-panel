import 'package:cached_network_image/cached_network_image.dart';
// import 'package:cached_video_player/cached_video_player.dart';
import 'package:flutter/material.dart';
import 'package:pod_player/pod_player.dart';
import 'package:real_estate/const/app.dart';

import '../../const/setting.dart';
import '../../model/property_detail.dart';
// import 'package:video_viewer/video_viewer.dart';
// import 'package:pod_player/pod_player.dart';

class VideoPreview extends StatelessWidget {
  const VideoPreview({
    super.key,
    required this.propertyName,
    required this.imgUrls,
    required this.videoUrl,
  });

  final String propertyName;
  final ImageModel imgUrls;
  final dynamic videoUrl;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => VideoPlayerWidget(
              title: propertyName, imageUrl: imgUrls.url, videoUrl: videoUrl))),
      child: Container(
        height: 70,
        width: 110,
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8.0),
            image: DecorationImage(
                image: CachedNetworkImageProvider(imgUrls.url),
                fit: BoxFit.cover)),
        child: Center(
            child: Container(
          height: 30,
          width: 30,
          decoration: const BoxDecoration(
              shape: BoxShape.circle, color: AppColor.lightBackground),
          child: const Icon(
            Icons.play_arrow,
            color: AppColor.primaryColor,
          ),
        )),
      ),
    );
  }
}

class VideoPlayerWidget extends StatefulWidget {
  final String title;
  final dynamic videoUrl;
  final String imageUrl;
  const VideoPlayerWidget(
      {super.key,
      required this.title,
      required this.videoUrl,
      required this.imageUrl});

  @override
  State<VideoPlayerWidget> createState() => _VideoPlayerWidgetState();
}

class _VideoPlayerWidgetState extends State<VideoPlayerWidget> {
  late final PodPlayerController controller;

  @override
  void initState() {
    controller = PodPlayerController(
        playVideoFrom: PlayVideoFrom.network(widget.videoUrl),
        podPlayerConfig: const PodPlayerConfig(
          autoPlay: true,
          isLooping: false,
          // videoQualityPriority: [720, 360],
        ))
      ..initialise();
    super.initState();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.darkModeColor,
      appBar: AppBar(
        backgroundColor: AppColor.darkModeColor,
        foregroundColor: Colors.white,
        title: Text(
          widget.title,
          style: TextStyle(
              fontFamily: AppFonts.medium,
              color: Colors.white,
              fontSize: AppTextSize.headerSize),
        ),
      ),
      body: PodVideoPlayer(
        controller: controller,
        backgroundColor: Colors.transparent,
        videoThumbnail: DecorationImage(
            image: CachedNetworkImageProvider(widget.imageUrl),
            fit: BoxFit.cover),
        podProgressBarConfig: PodProgressBarConfig(
            circleHandlerColor: Colors.blue,
            playingBarColor: Colors.grey.shade500,
            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 15)),
      ),
    );
  }
}
