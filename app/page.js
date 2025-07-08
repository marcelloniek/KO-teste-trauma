"use client";

import { useState } from 'react';

const perguntas = [
  "내가 겪은 힘들거나 충격적인 사건에 대한 원치 않는 기억이나 악몽 때문에 괴롭습니다.",
  "외상과 관련된 무언가를 떠올리거나 접했을 때 극도의 감정적 반응(두려움, 불안, 공포 등)을 보입니다.",
  "충격적 사건을 기억하게 할 수 있는 장소, 사람, 상황을 의식적으로 피합니다.",
  "힘든 경험 이후 새로운 사람들을 신뢰하거나 관계를 맺는 것이 어렵습니다.",
  "충격적인 사건 이후 이전에 즐거웠던 일들에서도 긍정적 감정이나 즐거움을 느끼기 어렵습니다.",
  "최근 트라우마로 인한 고통스러운 기억 때문에 삶을 포기하거나 자해를 생각한 적이 있습니다.", // FLAG
  "나쁜 일이 언제라도 다시 일어날 것 같은 불안감으로 자주 긴장하고 예민해져 있습니다.",
  "외상과 관련된 기억이나 생각 때문에 수면 장애(불면증, 잠을 설치는 등)를 겪습니다.",
  "강렬하거나 충격적인 사건 이후 집중력, 기억력 또는 주의력에 문제가 생겼습니다.",
  "외상 경험 이후 느끼는 두려움, 수치심, 고통 때문에 감정적, 사회적으로 나 자신을 고립시키고 있습니다."
];

export default function TesteTrauma() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("적색");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("녹색");
      else if (soma <= 35) setResultado("황색");
      else setResultado("적색");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">트라우마 테스트</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">질문 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">결과: {resultado}</h2>
          {resultado === "녹색" && <p>트라우마를 매우 잘 관리하고 있으며 정서적으로 안정된 상태입니다. 다른 사람들을 도울 수 있는 능력이 있습니다.</p>}
          {resultado === "황색" && <p>해결이 필요한 정서적 어려움의 신호가 나타납니다. 의지와 도움을 통해 충분히 극복할 수 있습니다.</p>}
          {resultado === "적색" && <p>이 주제와 관련된 트라우마 문제가 심각하여 전문적인 도움이 필요합니다. 가능한 빨리 의사나 심리 전문가를 찾으십시오.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            테스트 다시 하기
          </button>
        </>
      )}
    </div>
  );
}
