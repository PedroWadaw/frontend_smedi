import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import Summary from "../../Components/ui/Summary";
import SummaryMobile from "../../Components/ui/SummaryMobile";
import AnimatedContent from "../../Components/ui/AnimatedContent";

export default function Dashboard() {
  const { user, usageData } = useOutletContext();
  const [option, setOption] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [mode, setMode] = useState("daily");
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLow = useMediaQuery({ maxHeight: 800 });

  useEffect(() => {
    axios.get(`${baseApiUrl}/statistics/option`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setOption(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseApiUrl}/statistics/month`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setMonthlyData(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      axios.get(`${baseApiUrl}/statistics/month`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { month: selectedMonth },
      }).then((res) => {
        setMonthlyData(res.data);
      });
    }
  }, [selectedMonth]);

  const handleMonthly = (monthValue) => {
    setSelectedMonth(monthValue);
  };

  const chartData = useMemo(() => {
    return mode === "daily" ? usageData : monthlyData.data;
  }, [mode, usageData, monthlyData]);

  return (
    <div className="">
      {/* desktop */}
      {isDesktop && (
        <div className="w-full font-mont bg-gray-100">
          <AnimatedContent>
            <div className="flex max-w-full font-medium gap-x-4">
              <Summary header="Total Digunakan" isi={user?.transactions_summary?.total_digunakan || "0"} width="w-auto bg-orange-50 border border-orange-200" />
              <Summary header="Total Transaksi" isi={`Rp. ${user?.transactions_summary?.total_transaksi?.toLocaleString('id-ID') || "0"}`} width="w-auto bg-green-50 border border-green-300" />
              <Summary header="Average Transaction" isi={`Rp. ${user?.transactions_summary?.rata_transaksi?.toLocaleString('id-ID') || "0"}`} width="w-auto bg-yellow-50 border border-yellow-300" />
              <Summary header="Top Merchant" isi={user?.transactions_summary?.top_merchant || "Belum Ada"} width="flex-1 transition-all duration-300 bg-blue-50 border border-blue-300" />
            </div>
          </AnimatedContent>

          {/* Chart */}
          <AnimatedContent delay={0.5} >
            <div className="mt-3 p-6 bg-white rounded-lg shadow w-full">
              <div className="w-full flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Penggunaan {mode === "monthly" ? `Bulan ${monthlyData.month_label || "Ini"}` : "7 Hari Terakhir"}
                  </h2>
                  <p className="text-base text-gray-700 font-medium">
                    Statistik total penggunaan {mode === "monthly" ? `bulanan` : "mingguan"}
                  </p>
                </div>

                <div className="flex items-center gap-x-3 font-mont">
                  <div className="">
                    <div className="menu hover:cursor-pointer">
                      <div className="item">
                        <button className="link border">
                          <span> {mode === "daily" ? "Mingguan" : "Bulanan"}</span>
                          <svg viewBox="0 0 360 360" xml:space="preserve">
                            <g id="SVGRepo_iconCarrier">
                              <path
                                id="XMLID_225_"
                                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                              ></path>
                            </g>
                          </svg>
                        </button>
                        <div className="submenu bg-white hover:cursor-pointer">
                          <div className="submenu-item">
                            <button onClick={() => setMode("daily")} className="submenu-link"> Mingguan </button>
                          </div>
                          <div className="submenu-item">
                            <button onClick={() => setMode("monthly")} className="submenu-link"> Bulanan </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {mode === "daily" ?
                      (
                        <div className="text-[16px] border py-[5px] px-[12px] rounded-[5px] cursor-pointer">Minggu ini</div>
                      ) :
                      (<div className="menu hover:cursor-pointer">
                        <div className="item">
                          <button className="link border">
                            <span> {monthlyData.month_label}</span>
                          </button>
                          <div className="submenu bg-white">
                            {option.map((m) => (
                              <div key={m.value} className="submenu-item">
                                <button
                                  className="submenu-link"
                                  onClick={() => handleMonthly(m.value)}
                                >
                                  {m.label}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>)}

                  </div>
                </div>
              </div >

              <div className="w-full h-[350px] outline-white">
                <ResponsiveContainer>
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="day"
                      tickMargin={9}
                      interval={0}
                    />

                    <YAxis tickMargin={12} />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#ff8645"
                      fill="#ff8645"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                      animationDuration={200}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div >
          </AnimatedContent >
        </div >
      )
      }

      {/* Mobile */}
      {
        isMobile && (
          <div className="">
            <div className="grid grid-cols-2 w-full h-full px-2.5 py-3 gap-y-3 gap-x-2">
              <AnimatedContent>
                <SummaryMobile header="Total Digunakan" isi={user?.transactions_summary?.total_digunakan || "0"} color="bg-orange-50 border border-orange-200" />
              </AnimatedContent>
              <AnimatedContent >
                <SummaryMobile header="Rata-rata Belanja" isi={`Rp. ${user?.transactions_summary?.rata_transaksi?.toLocaleString('id-ID') || "0"}`} color="bg-yellow-50 border border-yellow-300" />
              </AnimatedContent>
              <div className="col-span-2">
                <AnimatedContent delay={0.2}>
                  <SummaryMobile header="Total Transaksi" isi={`Rp. ${user?.transactions_summary?.total_transaksi?.toLocaleString('id-ID') || "0"}`} color="bg-green-50 border border-green-300" />
                </AnimatedContent>
              </div>
              <div className="col-span-2">
                <AnimatedContent delay={0.4}>
                  <SummaryMobile header="Top Merchant" isi={user?.transactions_summary?.top_merchant || "Belum Ada"} color="bg-blue-50 border border-blue-300" />
                </AnimatedContent>
              </div>
            </div>

            <div className="px-3 pt-1">
              <AnimatedContent delay={0.7}>
                <div className="pr-3 pt-3 pb-5 bg-white rounded-lg shadow w-full">
                  <div className={`flex items-center justify-between ${isLow ? '' : 'pb-2'} pt-2 px-5`}>
                    <div>
                      <h2 className="text-xl font-bold">
                        Penggunaan 7 Hari Terakhir
                      </h2>
                      <p className="text-base text-gray-700 font-medium">
                        Statistik total penggunaan harian
                      </p>
                    </div>
                  </div>

                  <div className={`w-full ${isLow ? 'h-[280px]' : 'h-[310px]'} focus:outline-none`}>
                    <ResponsiveContainer>
                      <LineChart
                        data={usageData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                          dataKey="day"
                          tickMargin={9}
                          interval={1}
                        // fontSize={13.5}
                        />

                        <YAxis
                          tickMargin={12}
                        />

                        <Tooltip contentStyle={{ border: "none", outline: "none" }} />

                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#ff8645"
                          fill="#ff8645"
                          strokeWidth={3}
                          // dot={{ r: 5 }}
                          // activeDot={{ r: 7 }}
                          animationDuration={200}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </div>

        )
      }
    </div >
  );
}