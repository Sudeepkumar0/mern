function StudentList({ students }) {
  return (
    <ul>
      {students.map((s, i) => (
        <li key={i}>
          {s.name} - {s.email}
        </li>
      ))}
    </ul>
  );
}
export default StudentList;
