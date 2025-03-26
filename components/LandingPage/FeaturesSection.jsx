import { BookmarkPlus, ScanEye, RefreshCcw, ChartNoAxesCombined, Truck } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <BookmarkPlus className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mb-4" />,
      text: "Add & Categorize Product",
    },
    {
      icon: <ScanEye className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mb-4" />,
      text: "Track Stock Levels in Real-time",
    },
    {
      icon: <RefreshCcw className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mb-4" />,
      text: "Process Incoming & Outgoing Inventory",
    },
    {
      icon: <ChartNoAxesCombined className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mb-4" />,
      text: "Generate Reports and Insights",
    },
    {
      icon: <Truck className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mb-4" />,
      text: "Automate Reorders & Supplier Management",
    },
  ];

  const firstRow = features.slice(0, 3);
  const secondRow = features.slice(3);

  return (
    <section className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Change How You Handle Inventory
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mt-2">
          It’s That Easy
        </h2>

        {/* Feature Cards */}
        <div className="mt-12">
          {/* Mobile Grid (1 column) */}
          <div className="grid grid-cols-1 gap-6 sm:hidden">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center"
              >
                {feature.icon}
                <p className="text-lg font-medium text-gray-800">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Flex (3 + dynamic 1 or 2) */}
          <div className="hidden sm:block">
            {/* First Row */}
            <div className="flex justify-center gap-6 mb-6">
              {firstRow.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 lg:p-8 rounded-lg shadow-md flex flex-col items-center justify-center w-full sm:w-1/3 max-w-xs"
                >
                  {feature.icon}
                  <p className="text-lg lg:text-xl font-medium text-gray-800">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Second Row */}
            {secondRow.length > 0 && (
              <div className="flex justify-center gap-6">
                {secondRow.map((feature, index) => (
                  <div
                    key={index}
                    className={`bg-gray-50 p-6 lg:p-8 rounded-lg shadow-md flex flex-col items-center justify-center w-full max-w-xs ${
                      secondRow.length === 1 ? "mx-auto" : "w-5/12"
                    }`}
                  >
                    {feature.icon}
                    <p className="text-lg lg:text-xl font-medium text-gray-800">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}