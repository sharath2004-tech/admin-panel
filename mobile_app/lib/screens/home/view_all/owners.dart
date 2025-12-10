import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../const/app.dart';
import '../../../controllers/owners.dart';
import '../../../widgets/view_all/owners.dart';

class ViewAllPropertyOwnersScreen extends StatefulWidget {
  const ViewAllPropertyOwnersScreen({super.key});

  @override
  State<ViewAllPropertyOwnersScreen> createState() =>
      _ViewAllPropertyOwnersScreenState();
}

class _ViewAllPropertyOwnersScreenState
    extends State<ViewAllPropertyOwnersScreen> {
  // late Future _ownersData;

  // @override
  // void initState() {
  //   _ownersData = Provider.of<OwnersProvider>(context, listen: false)
  //       .getPropertyOwners();
  //   super.initState();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          elevation: 0.0,
          automaticallyImplyLeading: false,
          centerTitle: true,
          leading: IconButton(
            onPressed: () => Navigator.of(context).pop(),
            icon:
                const Icon(Icons.arrow_back_ios, size: 20, color: Colors.black),
          ),
          title: Text(
            "Owners Properties",
            style: TextStyle(
              color: Colors.black,
              fontSize: AppTextSize.headerSize,
              fontFamily: AppFonts.bold,
            ),
          ),
        ),
        body: SingleChildScrollView(
          child: Consumer<OwnersProvider>(
            builder: (context, data, _) {
              return GridView.builder(
                shrinkWrap: true,
                itemCount: data.owners.length,
                physics: const BouncingScrollPhysics(),
                scrollDirection: Axis.vertical,
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                  childAspectRatio: 1.2,
                  maxCrossAxisExtent: screenSize(context).width * 0.5,
                  mainAxisSpacing: screenSize(context).width * 0.04,
                  crossAxisSpacing: screenSize(context).width * 0.04,
                ),
                itemBuilder: (ctx, index) {
                  return ViewAllPropertyOwnersWidget(
                    id: data.owners[index].id,
                    name: data.owners[index].name,
                    imgUrl: data.owners[index].logo,
                  );
                },
              );
            },
          ),
        ));
  }
}
