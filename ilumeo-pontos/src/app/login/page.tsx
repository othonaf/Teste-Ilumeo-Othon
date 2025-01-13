import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from 'next/navigation';


export default function LoginPage() {

  const handleLogin = async () => {
    'use server';
    redirect('/entry-time');
    
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardContent className="login-content">
          <div className="space-y-2">
            <h1 className="login-title">
              <span className="font-[400]">Ponto</span>{" "}
              <span className="font-[800]">Ilumeo</span>
            </h1>
            <div className="relative">
              <Input
                type="text"
                id="userCode"
                placeholder=" "
                className="peer bg-slate-800 custom-input;"
              />
              <label
                htmlFor="userCode"
                className="floating-label"
              >
                Código do usuário
              </label>
            </div>

          </div>
          <form action={handleLogin}>
            <Button
              className="confirm-button"
            >
              Confirmar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}
