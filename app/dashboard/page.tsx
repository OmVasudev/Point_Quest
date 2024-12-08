export default function Dashboard() {
  // Data for the charts
  const barData = [
    { label: "Quiz Club", value: 500, color: "#ec4899" },
    { label: "IEEE", value: 400, color: "#3b82f6" },
    { label: "CMS", value: 100, color: "#ec4899" },
    { label: "ACM", value: 50, color: "#3b82f6" },
    { label: "ASME", value: 75, color: "#ec4899" },
    { label: "Photography Club", value: 300, color: "#3b82f6" },
    { label: "NSS", value: 250, color: "#ec4899" },
    { label: "Red Cross Society", value: 200, color: "#3b82f6" },
    { label: "Astronomy Club", value: 300, color: "#ec4899" },
    { label: "Rotaract Club", value: 450, color: "#3b82f6" },
  ];

  const doughnutData = [40, 35, 25];
  const totalEvents = doughnutData.reduce((acc, val) => acc + val, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}

      {/* Sidebar + Dashboard Content */}
      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <aside className="col-span-3 rounded-lg bg-white p-4 shadow">
          <ul className="space-y-4">
            <li className="font-semibold text-blue-600">All Clubs</li>
            <li className="text-gray-600">Cultural</li>
            <li className="text-gray-600">Literature</li>
            <li className="text-gray-600">Social</li>
            <li className="text-gray-600">Technical</li>
            <li className="text-gray-600">Environmental</li>
            <li className="text-gray-600">Photography</li>
            <li className="text-gray-600">Others</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="col-span-9 space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <p className="text-2xl font-bold text-blue-600">31</p>
              <p className="text-gray-600">Total Clubs</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <p className="text-2xl font-bold text-green-600">22</p>
              <p className="text-gray-600">Events Hosted</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <p className="text-2xl font-bold text-pink-600">366</p>
              <p className="text-gray-600">Participation</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <p className="text-2xl font-bold text-purple-600">28+</p>
              <p className="text-gray-600">Upcoming Events</p>
            </div>
          </div>

          {/* Graphs Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Horizontal Bar Chart */}
            <div className="rounded-lg bg-white p-4 shadow">
              <h2 className="mb-4 text-lg font-semibold text-gray-600">
                Total Students Enrolled
              </h2>
              <div className="space-y-4">
                {barData.map((item) => (
                  <div key={item.label} className="flex items-center">
                    <span className="w-48 text-gray-600">{item.label}</span>
                    <div className="relative h-6 flex-1 bg-gray-200">
                      {/* The bar itself */}
                      <div
                        style={{
                          width: `${(item.value / 500) * 100}%`,
                          backgroundColor: item.color,
                        }}
                        className="h-full"
                      />
                    </div>
                    <span className="ml-2 text-gray-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doughnut Chart */}
            <div className="rounded-lg bg-white p-4 shadow">
              <h2 className="mb-4 text-lg font-semibold text-gray-600">
                Events Conducted by Categories
              </h2>
              <div className="relative">
                <svg
                  width="200"
                  height="150"
                  viewBox="0 0 32 32"
                  className="h-full w-full"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="transparent"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeDasharray={`${(doughnutData[0] / totalEvents) * 100} ${100 - (doughnutData[0] / totalEvents) * 100}`}
                    strokeDashoffset="25"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="transparent"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeDasharray={`${(doughnutData[1] / totalEvents) * 100} ${100 - (doughnutData[1] / totalEvents) * 100}`}
                    strokeDashoffset="-25"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="transparent"
                    stroke="#ec4899"
                    strokeWidth="4"
                    strokeDasharray={`${(doughnutData[2] / totalEvents) * 100} ${100 - (doughnutData[2] / totalEvents) * 100}`}
                    strokeDashoffset="-75"
                  />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                  <p className="text-lg font-semibold text-gray-600">
                    Total Events
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {totalEvents}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
