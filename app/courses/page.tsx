import CourseCard from '../components/tachmonite/CourseCard';

const CoursesPage = () => {
  const courses = [
    { id: 1, title: 'Intro to AI Marketing', minutes: 5 },
    { id: 2, title: 'Automate Finances', minutes: 7 },
  ];
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map((c) => (
        <CourseCard key={c.id} title={c.title} minutes={c.minutes} />
      ))}
    </div>
  );
};

export default CoursesPage;
