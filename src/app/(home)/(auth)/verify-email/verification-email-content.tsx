"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ButtonWithLoading } from "@/components/ui/button";
import axios from "@/lib/axios";
import { MailCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function VerificationEmailContent() {
  const router = useRouter();
  const [isLogginOut, startLogginOut] = useTransition();
  const [isResendingEmailVerification, startSendingEmail] = useTransition();

  const handleLogOut = () => {
    startLogginOut(async () => {
      await axios.post("/logout");
      router.refresh();
    });
  };

  const [status, setStatus] = useState<string | null>(null);

  const resendEmailVerification = () => {
    startSendingEmail(async () => {
      await axios
        .post<{ status: string }>("/email/verification-notification")
        .then((response) => setStatus(response.data.status));
    });
  };

  return (
    <div className="space-y-4">
      <p>
        ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar tu
        dirección de correo electrónico haciendo clic en el enlace que te
        acabamos de enviar? Si no recibiste el correo electrónico, con gusto te
        enviaremos otro.
      </p>

      <div className="flex items-center justify-between">
        <ButtonWithLoading
          isLoading={isResendingEmailVerification}
          onClick={resendEmailVerification}
        >
          Reenviar Correo de Verificación
        </ButtonWithLoading>

        <ButtonWithLoading
          isLoading={isLogginOut}
          variant="secondary"
          onClick={handleLogOut}
        >
          Cerrar sesión
        </ButtonWithLoading>
      </div>

      {status === "verification-link-sent" && (
        <Alert>
          <MailCheckIcon className="size-4" />
          <AlertTitle>Reenviado</AlertTitle>
          <AlertDescription>
            Se ha enviado un nuevo enlace de verificación a la dirección de
            correo electrónico que proporcionaste durante el registro.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
