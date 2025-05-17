export default function Team() {
  const team = [
    {
      name: 'Александр Мороз',
      role: 'Главный',
      image: '/team/sasha.jpg',
    },
    {
      name: 'Майя Кузьмицкая',
      role: 'Девушка главного',
      image: '/team/maia.jpg',
    },
    {
      name: 'Римма Михова',
      role: 'Подруга главного',
      image: '/team/rima.jpg',
    },
    {
      name: 'Андрей Корнев',
      role: 'Андрей',
      image: '/team/andrei.jpg',
    },
  ];

  return (
    <section className="mt-5 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-gray-800">
          Команда по внедрению ISMS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>
              <p className="text-lg font-medium text-gray-800 mt-4">
                {member.name}
              </p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
