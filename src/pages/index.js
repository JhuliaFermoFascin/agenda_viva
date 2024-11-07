import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/Login'); // Redireciona para a página de login, substituindo a rota atual
  }, []);

  return null; // Não exibe nada na rota principal
}
