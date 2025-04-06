import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          AiSync.me
        </h1>
        <p className="text-xl text-gray-600">
          Ваш AI-ассистент для управления задачами, планирования встреч и автоматизации бизнес-процессов
        </p>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Войти
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md bg-white px-6 py-3 text-lg font-medium text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Регистрация
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Управление задачами</h2>
            <p className="text-gray-600">Создавайте, редактируйте и получайте напоминания о задачах с помощью AI-ассистента</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Планирование встреч</h2>
            <p className="text-gray-600">Планируйте встречи и события с автоматической синхронизацией календаря</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Автоматизация</h2>
            <p className="text-gray-600">Автоматизируйте бизнес-процессы и интегрируйтесь с внешними сервисами</p>
          </div>
        </div>
      </div>
    </div>
  );
}
