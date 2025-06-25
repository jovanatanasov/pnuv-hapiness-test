import React, { useState } from 'react';

const questions = [
  "Во главно, јас сум среќен/на личност.",
  "Во споредба со повеќето мои врсници, јас сум посреќен/на.",
  "Некои луѓе се во главно многу среќни. Тие уживаат во животот, независно од тоа што им се случува. До кој степен Ве опишува ова?",
  "Некои луѓе се во главно многу несреќни. Иако не се депресивни, тие никогаш не изгледаат среќни. До кој степен Ве опишува ова?"
];

const scale = [
  "1 - Воопшто не се согласувам",
  "2 - Не се согласувам",
  "3 - Делумно не се согласувам",
  "4 - Ниту се согласувам, ниту не се согласувам",
  "5 - Делумно се согласувам",
  "6 - Се согласувам",
  "7 - Целосно се согласувам"
];

export default function ShsTest() {
  const [answers, setAnswers] = useState(Array(4).fill(null));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answers.includes(null)) {
      setError('Ве молиме одговорете на сите прашања.');
      setResult(null);
      return;
    }

    const average = (answers.reduce((a, b) => a + b, 0) / answers.length).toFixed(2);
    setError('');
    setResult(average);
  };

  const interpret = (score) => {
    const s = parseFloat(score);
    if (s >= 6) return "🎉 Исклучително високо ниво на среќа";
    if (s >= 5) return "🙂 Високо ниво на среќа";
    if (s >= 4) return "😐 Просечно ниво на среќа";
    if (s >= 3) return "😟 Ниско ниво на среќа";
    return "☹️ Многу ниско ниво на среќа";
  };

  const fillRandomAnswers = () => {
    setAnswers(questions.map(() => Math.floor(Math.random() * 7) + 1));
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Субјективна скала на среќа</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Одговорете на секое прашање според тоа колку се согласувате.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-8">
        {questions.map((q, idx) => (
          <div key={idx} className="border-b pb-6">
            <p className="mb-2 font-medium">{idx + 1}. {q}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scale.map((label, i) => (
                <label key={i} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={i + 1}
                    checked={answers[idx] === i + 1}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-4 justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700"
          >
            Поднеси
          </button>
        </div>

        {result && (
          <div className="mt-6 text-lg text-center">
            <p>🧮 Просечен резултат: <strong>{result}</strong></p>
            <p className="mt-2">{interpret(result)}</p>
             <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto italic">
      *Овој тест служи само за лична рефлексија и не претставува професионална дијагноза. 
      Доколку чувствуваш потреба, секогаш е добро да разговараш со стручно лице или некој кому му веруваш.*
    </p>
          </div>
        )}
      </form>
    </div>
  );
}
