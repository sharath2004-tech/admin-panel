import 'package:expandable/expandable.dart';
import 'package:expandable_text/expandable_text.dart';
import 'package:flutter/material.dart';
import '../../const/app.dart';

class DescriptionWidget extends StatelessWidget {
  const DescriptionWidget({
    super.key,
    required this.description,
  });

  final String description;

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0),
        child: ExpandableNotifier(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Expandable(
                collapsed: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ExpandableText(
                      description,
                      maxLines: 7,
                      expandText: 'Read more',
                      collapseText: 'Read less',
                      linkColor: Colors.blue,
                      style: TextStyle(
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.medium),
                      // expandedAlignment: Alignment.bottomLeft, // Align the expanded text at the bottom
                    ),
                  ],
                ),
                expanded: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ExpandableText(
                      description,
                      expandText: 'Read more',
                      collapseText: 'Read less',
                      linkColor: Colors.blue,
                      style: TextStyle(
                          fontSize: AppTextSize.titleSize,
                          fontFamily: AppFonts.medium),
                      // expandedAlignment: Alignment.bottomLeft, // Align the expanded text at the bottom
                    ),
                  ],
                ),
              ),
            ],
          ),
        ));
  }
}
