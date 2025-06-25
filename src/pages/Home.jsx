import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-row items-center justify-center px-4">
      
      <div className="flex-1 max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
          Добредојдовте.
        </h1>
        <p className="text-lg text-gray-400 mb-6 text-center max-w-xl mx-auto">
          Проверете го вашето ниво на среќа со светски познати тестови адаптирани на македонски јазик.
          </p>
        

        <div className="grid gap-4 w-full max-w-md mx-auto">
          <Link
            to="/oxford"
            className="block bg-gray-800 hover:bg-gray-700 border-2 border-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow transition"
          >
            Оксфордски прашалник за ниво на среќа
          </Link>
          <Link
            to="/swls"
            className="block bg-gray-800 hover:bg-gray-700 border-2 border-green-500 text-white font-semibold py-3 px-6 rounded-md shadow transition"
          >
            Скала на задоволство од животот 
          </Link>
          <Link
            to="/shs"
            className="block bg-gray-800 hover:bg-gray-700 border-2 border-yellow-500 text-white font-semibold py-3 px-6 rounded-md shadow transition"
          >
            Субјективна скала на среќа 
          </Link>
        </div>
        <p className="mt-4 text-md text-gray-500 max-w-xl mx-auto italic">
      *Овие тестови служат само за лична рефлексија и не претставуваат професионална дијагноза. 
      Доколку чувствувате потреба, секогаш е добро да разговарате со стручно лице или некој кому му верувате.*
    </p>
      </div>

      
      <div className="hidden lg:block flex-1 max-w-lg">
        <div className="h-full flex items-center justify-center">
          <svg
            className="w-3/4 h-3/4 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" strokeWidth="4" />
            <circle cx="100" cy="100" r="60" strokeWidth="4" />
            <circle cx="100" cy="100" r="40" strokeWidth="4" />
          </svg>
        </div>
      </div>
    </div>
  );
}   