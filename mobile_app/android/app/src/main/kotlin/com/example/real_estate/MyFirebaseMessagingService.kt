import android.content.Intent
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        // Handle incoming message when the app is in the background or terminated.
    }

    override fun onNewToken(token: String) {
        // Handle token refresh.
    }

    override fun onDeletedMessages() {
        // Handle deleted messages.
    }
}
