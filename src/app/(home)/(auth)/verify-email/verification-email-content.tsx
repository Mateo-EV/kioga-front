"use client";

import { Button, ButtonWithLoading } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function VerificationEmailContent() {
  const router = useRouter();
  const [isLogginOut, startLogginOut] = useTransition();

  const handleLogOut = () => {
    startLogginOut(async () => {
      await axios.post("/logout");
      router.refresh();
    });
  };

  const [status, setStatus] = useState<string | null>(null);

  const resendEmailVerification = async () => {
    await axios
      .post("/email/verification-notification")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .then((response) => setStatus(response.data.status as unknown as string));
  };

  return (
    <div>
      <p>
        ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar tu
        dirección de correo electrónico haciendo clic en el enlace que te
        acabamos de enviar? Si no recibiste el correo electrónico, con gusto te
        enviaremos otro.
      </p>

      {status === "verification-link-sent" && (
        <div className="mb-4 text-sm font-medium text-green-600">
          Se ha enviado un nuevo enlace de verificación a la dirección de correo
          electrónico que proporcionaste durante el registro.
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={resendEmailVerification}>
          Reenviar Correo de Verificación
        </Button>

        <ButtonWithLoading
          isLoading={isLogginOut}
          variant="secondary"
          onClick={handleLogOut}
        >
          Cerrar sesión
        </ButtonWithLoading>
      </div>
    </div>
  );
}
