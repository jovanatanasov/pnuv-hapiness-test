import React, { useState } from 'react';

const questions = [
  "Не сум особено задоволен од тоа каков/каква сум.",
  "Многу се интересирам за другите луѓе.",
  "Чувствувам дека животот многу наградува.",
  "Имам многу топли чувства кон речиси сите.",
  "Ретко се будам одморен/одморена.",
  "Не сум особено оптимистичен/оптимистична за иднината.",
  "Повеќето работи ми се забавни.",
  "Секогаш сум посветен/а и вклучен/а.",
  "Животот е добар.",
  "Не мислам дека светот е добро место.",
  "Многу често се смеам.",
  "Задоволен/на сум од сè во мојот живот.",
  "Не мислам дека изгледам привлечно.",
  "Постои разлика помеѓу тоа што сакам да го направам и тоа што сум го направил/а.",
  "Многу сум среќен/среќна.",
  "Наоѓам убавина во многу нешта.",
  "Секогаш имам позитивно влијание врз другите.",
  "Успевам да вклопам сè што сакам во секојдневието.",
  "Не чувствувам дека сум посебно во контрола на својот живот.",
  "Чувствувам дека можам да се справам со сè.",
  "Целосно сум ментално присутен/присутна.",
  "Често доживувам радост и воодушевување.",
  "Тешко ми е да носам одлуки.",
  "Немам посебно чувство за цел и значење во животот.",
  "Имам многу енергија.",
  "Обично имам позитивно влијание врз настаните.",
  "Не се забавувам со другите луѓе.",
  "Не се чувствувам особено здраво.",
  "Немам многу среќни спомени од минатото."
];

const scale = [
  "1 - Воопшто не се согласувам",
  "2 - Не се согласувам",
  "3 - Делумно не се согласувам",
  "4 - Делумно се согласувам",
  "5 - Се согласувам",
  "6 - Целосно се согласувам"
];


const reverseScored = [0, 4, 5, 9, 12, 13, 18, 22, 23, 26, 27, 28];

export default function OxfordTest() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
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


    const total = answers.reduce((acc, val, idx) => {
      const adjusted = reverseScored.includes(idx) ? 7 - val : val;
      return acc + adjusted;
    }, 0);

    const average = (total / questions.length).toFixed(2);
    setError('');
    setResult(average);
  };

  const interpret = (avg) => {
    const score = parseFloat(avg);
    if (score >= 5.0) return "🎉 Исклучително високо ниво на среќа";
    if (score >= 4.0) return "🙂 Високо ниво на среќа";
    if (score >= 3.0) return "😐 Просечно ниво на среќа";
    if (score >= 2.0) return "😟 Ниско ниво на среќа";
    return "☹️ Многу ниско ниво на среќа";
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Оксфордски прашалник за ниво на среќа</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        Одговори на секое прашање според тоа колку се согласуваш со дадената изјава.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-8">
        {questions.map((q, idx) => (
          <div key={idx} className="border-b pb-6">
            <p className="mb-2 font-medium">{idx + 1}. {q}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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

        <div className="text-center">
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700"
          >
            Поднеси
          </button>

          {result && (
  <div className="mt-6 text-lg text-center">
    <p>🧮 Твојата просечна оценка е: <strong>{result}</strong></p>
    <p className="mt-2">{interpret(result)}</p>

    <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto italic">
      *Овој тест служи само за лична рефлексија и не претставува професионална дијагноза. 
      Доколку чувствуваш потреба, секогаш е добро да разговараш со стручно лице или некој кому му веруваш.*
    </p>
  </div>
)}
        </div>
      </form>
    </div>
  );
}
