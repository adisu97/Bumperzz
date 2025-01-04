<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'vendor/autoload.php';
use Mailgun\Mailgun;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $bookingDatetime = htmlspecialchars($_POST['booking-datetime']);

    // Mailgun API key och domain
    $apiKey = '72ac6dd3ee953a3d7671bbae02362f01-e61ae8dd-41f151c9'; // Ersätt med din Mailgun API-nyckel
    $domain = 'sandboxb2b529dff1d2400f84078708aae54701.mailgun.org'; // Ersätt med din Mailgun-domain

    // Skicka e-post
    try {
        $mgClient = Mailgun::create($apiKey);
        $result = $mgClient->messages()->send($domain, [
            'from'    => "$name <din.hotmail@hotmail.com>",
            'to'      => 'adisu9751@gmail.com',
            'subject' => "Ny bokningsförfrågan från $name",
            'text'    => "Namn: $name\nE-post: $email\nMeddelande:\n$message\nBokningsdatum och tid: $bookingDatetime"
        ]);

        echo "Tack! Ditt meddelande har skickats.";
    } catch (Exception $e) {
        echo "Ett fel uppstod när meddelandet skulle skickas. Felmeddelande: " . $e->getMessage();
    }
} else {
    echo "Ogiltig begäran.";
}
?>