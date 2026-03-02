/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, ClipboardList, Volume2, XCircle } from "lucide-react";

type View = "daily" | "list";

export default function App() {
  const [view, setView] = useState<View>("daily");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const currentDate = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '/');

  const userData = {
    username: "VIB14380",
    userId: "4d123ec2",
    underReviewTasks: [
      { label: "今日采集任务", count: "3个" },
      { label: "今日快判任务", count: "5个" }
    ],
    approvedTasks: [
      { label: "今日采集任务", count: "12个" },
      { label: "今日快判任务", count: "8个" }
    ],
    failedTasks: [
      { label: "今日采集任务", count: "1个" },
      { label: "今日快判任务", count: "2个" }
    ]
  };

  const mockReports = [
    {
      id: "3",
      username: "VIB17981",
      type: "快判任务",
      level: "简单",
      startTime: "2026/2/3 14:44:15",
      duration: "1分28秒",
      accuracy: "18/20",
      contribution: "+18 积分",
      status: "已完成"
    },
    {
      id: "91",
      username: "VIB17981",
      type: "快判任务",
      level: "简单",
      startTime: "2026/3/1 14:30:24",
      duration: "3分31秒",
      accuracy: "10/20",
      contribution: "+10 积分",
      status: "已完成"
    }
  ];

  const mockWrongQuestions = [
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      question: "图中物品的颜色是？",
      wrongAnswer: "黑色",
      correctAnswer: "白色"
    },
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      question: "这是什么电子设备？",
      wrongAnswer: "音箱",
      correctAnswer: "耳机"
    }
  ];

  const mockUnpassedRecords = [
    {
      text: "今天天气真不错，适合出去玩。",
      error: "采集质量未达标"
    },
    {
      text: "人工智能正在改变我们的生活方式。",
      error: "采集质量未达标"
    }
  ];

  const handleReportClick = (label: string, status: string) => {
    setSelectedCategory(label);
    setSelectedStatus(status);
    setView("list");
  };

  const DailyReport = () => (
    <motion.div 
      key="daily"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md bg-white rounded-3xl shadow-sm overflow-hidden p-6"
    >
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-xl font-semibold text-gray-800">我的任务日报</h1>
        <span className="bg-purple-100 text-purple-500 text-xs px-2 py-0.5 rounded-md font-medium">
          当日
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-6">{currentDate}</p>

      {/* User Info Section */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">用户名</span>
          <span className="font-medium text-gray-800">{userData.username}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">用户 ID</span>
          <span className="font-medium text-gray-800">{userData.userId}</span>
        </div>
      </div>

      {/* Task Sections */}
      <div className="space-y-8">
        {/* Under Review Section */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4">审核中报告</h2>
          <div className="space-y-4">
            {userData.underReviewTasks.map((task, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-500">{task.label}</span>
                <button 
                  onClick={() => handleReportClick(task.label, "underReview")}
                  className="text-blue-500 font-medium hover:underline cursor-pointer"
                >
                  {task.count}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Approved Section */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4">审核通过报告</h2>
          <div className="space-y-4">
            {userData.approvedTasks.map((task, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-500">{task.label}</span>
                <button 
                  onClick={() => handleReportClick(task.label, "approved")}
                  className="text-blue-500 font-medium hover:underline cursor-pointer"
                >
                  {task.count}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Failed Section */}
        <section>
          <h2 className="text-lg font-medium text-gray-800 mb-4">审核未通过报告</h2>
          <div className="space-y-4">
            {userData.failedTasks.map((task, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-500">{task.label}</span>
                <button 
                  onClick={() => handleReportClick(task.label, "failed")}
                  className="text-blue-500 font-medium hover:underline cursor-pointer"
                >
                  {task.count}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer / Action */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-center">
        <button className="text-purple-500 text-sm font-medium flex items-center justify-center gap-1 mx-auto hover:opacity-80 transition-opacity">
          查看历史报告 <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );

  const TaskReportList = () => (
    <motion.div 
      key="list"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-full max-w-md pb-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <button 
          onClick={() => setView("daily")}
          className="p-1 -ml-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm">
          <ClipboardList size={20} />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">AI标注</h1>
      </div>

      {/* List of Cards */}
      <div className="space-y-6">
        {mockReports.map((report, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-sm overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-lg font-semibold text-gray-800">任务报告</h2>
              <span className="bg-purple-100 text-purple-500 text-xs px-2 py-0.5 rounded-md font-medium">
                {selectedStatus === "underReview" 
                  ? "审核中" 
                  : selectedStatus === "failed" 
                    ? "审核未通过" 
                    : selectedStatus === "approved"
                      ? "审核通过"
                      : report.status}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">任务编号</span>
                <span className="text-gray-800 font-medium">{report.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">用户名</span>
                <span className="text-gray-800 font-medium">{report.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">任务类型</span>
                <span className="text-gray-800 font-medium">
                  {selectedCategory.includes("采集任务") ? "采集任务" : 
                   selectedCategory.includes("快判任务") ? "快判任务" : report.type}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">任务级别</span>
                <span className="text-gray-800 font-medium">{report.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">开始时间</span>
                <span className="text-gray-800 font-medium">{report.startTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">任务耗时</span>
                <span className="text-gray-800 font-medium">{report.duration}</span>
              </div>
              {selectedStatus === "failed" && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">错题数</span>
                  <span className="text-red-500 font-medium">2个</span>
                </div>
              )}
              {selectedStatus !== "underReview" && selectedStatus !== "failed" && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">任务准确率</span>
                  <span className="text-green-500 font-medium">{report.accuracy}</span>
                </div>
              )}
            </div>

            {selectedStatus !== "underReview" && selectedStatus !== "failed" && (
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-400 text-sm">获得贡献度</span>
                <span className="text-purple-500 font-semibold">{report.contribution}</span>
              </div>
            )}

            {/* Wrong Question Snapshot Section (Quick Judgment) */}
            {selectedStatus === "failed" && selectedCategory.includes("快判任务") && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-[#888] text-base font-bold mb-4">错题快照</h3>
                <div className="space-y-3">
                  {mockWrongQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="bg-[#F2F3F5] rounded-3xl p-4 flex items-center gap-4">
                      <img 
                        src={q.image} 
                        alt="wrong question" 
                        className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 text-base font-bold mb-2">{q.question}</p>
                        <div className="flex items-center gap-3 text-sm font-medium">
                          <span className="text-[#FF3B30]">{q.wrongAnswer}</span>
                          <span className="text-gray-300">
                            <ChevronRight size={14} strokeWidth={3} />
                          </span>
                          <span className="text-[#34C759]">{q.correctAnswer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unpassed Record Snapshot Section (Collection Task) */}
            {selectedStatus === "failed" && selectedCategory.includes("采集任务") && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-[#888] text-base font-bold mb-4">未通过记录快照</h3>
                <div className="space-y-3">
                  {mockUnpassedRecords.map((record, rIdx) => (
                    <div key={rIdx} className="bg-[#F2F3F5] rounded-3xl p-4 flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                        <Volume2 size={32} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-base font-bold mb-2">{record.text}</p>
                        <div className="flex items-center gap-1.5 text-[#FF3B30] text-sm font-medium">
                          <XCircle size={16} />
                          <span>{record.error}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 font-sans text-[#333]">
      <AnimatePresence mode="wait">
        {view === "daily" ? <DailyReport /> : <TaskReportList />}
      </AnimatePresence>
    </div>
  );
}

