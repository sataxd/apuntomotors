<?php

namespace App\Http\Controllers;

use App\Helpers\EmailConfig;
use App\Models\Message;
use App\Models\Ordenes;
use App\Models\Social;
use App\Models\User;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Text;
use Illuminate\Support\Facades\View;

class MailingController extends BasicController
{
    public $model = 'Mailing';
    static function notifyContact(Message $messageJpa)
    {
        // 1. Enviar acuse de recibo / confirmación al cliente
        try {
            $templatePath = storage_path('app/utils/mailing/contact.html');
            if (file_exists($templatePath)) {
                $content = file_get_contents($templatePath);
                $domainUrl = env('APP_URL') ?: url('/');
                $data = [
                    'contact' => $messageJpa->toArray(),
                    'domain' => rtrim($domainUrl, '/')
                ];
                $mail = EmailConfig::config();
                $mail->Subject = '¡Gracias por contactar a ' . env('APP_NAME', 'Apunto Motors') . '!';
                $mail->isHTML(true);
                $mail->Body = Text::replaceData($content, JSON::flatten($data), [
                    'contact.name' => fn($x) => explode(' ', $x)[0]
                ]);
                if (!empty($messageJpa->email)) {
                    $mail->addAddress($messageJpa->email, $messageJpa->name);
                    $mail->send();
                }
            }
        } catch (\Throwable $th) {
            \Log::error('Error enviando auto-respuesta de contacto: ' . $th->getMessage());
            if (\env('APP_ENV') == 'local') {
                dump($th->getMessage());
            }
        }

        // 2. Enviar notificación con los datos de la consulta al Administrador
        try {
            $adminEmail = env('MAIL_TO_ADDRESS', env('MAIL_USERNAME'));
            if ($adminEmail) {
                $adminMail = EmailConfig::config();
                $adminMail->Subject = 'Nuevo mensaje web: ' . ($messageJpa->name ?? 'Cliente');
                $adminMail->isHTML(true);
                $name = htmlspecialchars($messageJpa->name ?? 'No especificado');
                $email = htmlspecialchars($messageJpa->email ?? 'No especificado');
                $rawDesc = $messageJpa->description ?? '';
                $serviceName = 'General / No especificado';
                if (preg_match('/^Servicio solicitado:\s*(.+?)\n\n(.*)$/s', $rawDesc, $matches)) {
                    $serviceName = htmlspecialchars($matches[1]);
                    $desc = nl2br(htmlspecialchars($matches[2]));
                } else {
                    $desc = nl2br(htmlspecialchars($rawDesc));
                }
                $date = date('d/m/Y H:i');

                $adminMail->Body = "
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;'>
                    <h2 style='color: #111827; border-bottom: 2px solid #dc2626; padding-bottom: 10px; margin-top: 0;'>Nueva Solicitud de Presupuesto</h2>
                    <p style='color: #374151; font-size: 15px;'>Se ha recibido una nueva solicitud de presupuesto desde el sitio web:</p>
                    <table style='width: 100%; border-collapse: collapse; margin-top: 15px;'>
                        <tr style='background-color: #f9fafb;'>
                            <td style='padding: 10px; font-weight: bold; width: 150px; border: 1px solid #e5e7eb;'>Nombre:</td>
                            <td style='padding: 10px; border: 1px solid #e5e7eb;'>{$name}</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;'>Correo:</td>
                            <td style='padding: 10px; border: 1px solid #e5e7eb;'><a href='mailto:{$email}'>{$email}</a></td>
                        </tr>
                        <tr style='background-color: #f9fafb;'>
                            <td style='padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;'>Teléfono / Móvil:</td>
                            <td style='padding: 10px; border: 1px solid #e5e7eb;'><a href='tel:{$phone}'>{$phone}</a></td>
                        </tr>
                        <tr style='background-color: #fff1f2;'>
                            <td style='padding: 10px; font-weight: bold; border: 1px solid #fecdd3; color: #9f1239;'>Servicio requerido:</td>
                            <td style='padding: 10px; border: 1px solid #fecdd3; font-weight: bold; color: #dc2626;'>{$serviceName}</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px; font-weight: bold; border: 1px solid #e5e7eb; vertical-align: top;'>Detalle / Mensaje:</td>
                            <td style='padding: 10px; border: 1px solid #e5e7eb;'>{$desc}</td>
                        </tr>
                    </table>
                    <p style='margin-top: 20px; font-size: 12px; color: #6b7280;'>Recibido el {$date} hrs.</p>
                </div>";

                $adminMail->addAddress($adminEmail);
                $adminMail->send();
            }
        } catch (\Throwable $th) {
            \Log::error('Error enviando notificación de contacto al admin: ' . $th->getMessage());
            if (\env('APP_ENV') == 'local') {
                dump($th->getMessage());
            }
        }
    }

    static function simpleNotify(string $view, string $email, array $data, array $ccs = [])
    {
        try {

            $socials = Social::where('visible', true)->where('status', true)->get();
            $data =  \array_merge(
                ['socials' => $socials->toArray()],
                $data
            );
            $content = View::make($view, $data)->render();

            $mail = EmailConfig::config();
            $mail->Subject = $data['title'] ?? 'Hola que tal?';
            $mail->isHTML(true);
            $mail->Body = $content;
            $mail->addAddress($email);
            foreach ($ccs as $cc) {
                $mail->addCC($cc);
            }
            $mail->send();
        } catch (\Throwable $th) {
            if (\env('APP_ENV') == 'local') {
                dump($th->getMessage());
            }
        }
    }
}
