import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const App = () => {
  const [initialAmount, setInitialAmount] = useState(1000000);
  const [monthlyAmount, setMonthlyAmount] = useState(50000);
  const [annualRate, setAnnualRate] = useState(5);
  const [years, setYears] = useState(20);
  const [chartData,setChartData] = useState([])
  const [summary,setSummary] = useState({
    principal:0,
    profit:0,
    total:0
  })


  const calculateInvestment = () => {
    const initial = Number(initialAmount)
    const monthly = Number(monthlyAmount)
    const rate = Number(annualRate)/100
    const totalYears = Number(years)

    const monthlyRate = (1 + rate) ** (1/12) - 1
    let balance = initial

    const result = [
      {
        year:0,
        amount:initial
      }
    ]

    for(let month = 1; month <= totalYears*12; month++){
      balance = balance * (1 + monthlyRate);
      balance = balance + monthly;

      if (month % 12 === 0){
        result.push({
          year:month / 12,
          amount: Math.round(balance)
        })
      }
    }

    const principal = initial + monthly * totalYears * 12
    const profit = balance - principal

    setChartData(result)
    setSummary({
      principal:Math.round(principal),
      profit:Math.round(profit),
      total:Math.round(balance)
    }
    )


  };

  return(
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header>
          <h1 className="text-3xl font-bold">
            投資信託シミュレーター
          </h1>

          <p className="mt-2 text-slate-400">
            将来の資産形成をシミュレーションします
          </p>
        </header>

        <main className="mt-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 入力エリア */}
            <div className="rounded-2xl bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">
                投資条件
              </h2>
              <div className="mt-6  space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    初期投資額
                  </label>

                  <input
                   type="number"
                   value={initialAmount}
                   onChange={(e)=>setInitialAmount(e.target.value)}
                   className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
                   />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    毎月の積立額
                  </label>

                  <input
                   type="number"
                   value={monthlyAmount}
                   onChange={(e)=>setMonthlyAmount(e.target.value)}
                   className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
                   />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    想定利回り（%）
                  </label>

                  <input
                   type="number"
                   value={annualRate}
                   onChange={(e)=>setAnnualRate(e.target.value)}
                   className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    運用期間（年）
                  </label>

                  <input
                   type="number"
                   value={years}
                   onChange={(e)=>setYears(e.target.value)}
                   className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
                  />
                </div>

                <button
                 onClick={calculateInvestment}
                 className="w-full rounded-lg bg-sky-500 px-4 py-3 font-semibold text-slate-950 hover:bg-sky-400"
                >
                  シミュレーション実行
                </button>
              </div>
            </div>

            {/* グラフエリア */}
            <div className="rounded-2xl bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">
                資産推移
              </h2>

              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="year"/>
                    <YAxis/>
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#38bdf8"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-400">
            初期投資額: {initialAmount} 円
            <br />
            毎月積立額: {monthlyAmount} 円
            <br />
            想定利回り: {annualRate} %
            <br />
            運用期間: {years} 年
          </div>

          {/* 結果カード */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                元本
              </p>

              <p className="mt-2 text-2xl font-bold">
                ¥{summary.principal.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                運用益
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-400">
                ¥{summary.profit.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                総資産
              </p>
              <p className="mt-2 text-2xl font-bold text-sky-400">
                ¥{summary.total.toLocaleString()}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
};



export default App;