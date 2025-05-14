import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const HStatistics = () => {
  const stats = [
    { value: 25000, label: "Schools Listed" },
    { value: 100000, label: "Schools Viewed", suffix: "+" },
    { value: 150000, label: "Visitors", suffix: "+" },
  ];

  
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2, 
  });

  return (
    <div className="bg-gray-100 py-12" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <h2 className="h text-3xl md:text-4xl font-bold mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-4xl md:text-5xl font-bold text-[#00BFA6]">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={3}
                    separator=","
                    suffix={stat.suffix || ""}
                  />
                )}
              </h3>
              <p className="text-lg text-gray-700 mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HStatistics;
