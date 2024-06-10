"use client";

export default function ErrorPage({ error }: { error: Error }) {
  if (error.message === "Too many requests")
    return (
      <div className="grid h-screen place-items-center">
        <h2>Límite de Peticiones Excedido</h2>
      </div>
    );
}
