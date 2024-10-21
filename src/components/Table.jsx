function Table({ data }) {
  if (data.length === 0) 
    return <p className="text-center text-2xl font-semibold">Form Data Table</p>;

  return (
    <div className="w-full mt-8 flex  justify-center overflow-x-auto">
      <table className="table-auto  text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-400">
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Password</th>
            <th className="border border-gray-300 px-4 py-2">Number</th>
            <th className="border border-gray-300 px-4 py-2">State</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Subjects</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-green-200">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.fullName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.password}</td>
              <td className="border border-gray-300 px-4 py-2">{item.number}</td>
              <td className="border border-gray-300 px-4 py-2">{item.state}</td>
              <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.subjects.length > 0 ? item.subjects.join(', ') : 'None'}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
