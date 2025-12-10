class CustomException implements Exception {
  String message;
  CustomException({required this.message});

  @override
  String toString() {
    return message;
  }
}
