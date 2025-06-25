import React, { useState } from 'react';

const questions = [
  "Во голема мера, мојот живот е блиску до идеален.",
  "Живеам во одлични услови.",
  "Задоволен/на сум со мојот живот.",
  "Досега, сум ги постигнал/а важните нешта што ги сакав во животот.",
  "Кога би можел/а да го живеам животот од почеток, би променил/а многу малку."
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

export default function SwlsTest() {
  const [answers, setAnswers] = useState(Array(5).fill(null));
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

    const total = answers.reduce((a, b) => a + b, 0);
    setError('');
    setResult(total);
  };

  const interpret = (score) => {
    if (score >= 31) return "🎉 Премногу сум задоволен од својот живот";
    if (score >= 26) return "🙂 Високо ниво на задоволство од својот живот";
    if (score >= 21) return "😐 Просечно ниво на задоволство од својот живот";
    if (score >= 16) return "😟 Малку под просечно ниво на задоволство од својот живот";
    if (score >= 10) return "☹️ Незадоволство од својот живот";
    return "😭 Крајно незадоволство од својот живот";
  };

  const fillRandomAnswers = () => {
    setAnswers(questions.map(() => Math.floor(Math.random() * 7) + 1));
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Скала на задоволство од животот</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Одговорете на секоја изјава според тоа колку се согласувате.
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
          <button
            type="button"
            onClick={fillRandomAnswers}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400"
          >
            Пополни автоматски
          </button>
        </div>

        {result && (
          <div className="mt-6 text-lg text-center">
            <p>🧮 Вкупен резултат: <strong>{result}</strong></p>
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
