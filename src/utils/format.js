const subjects = [
  { id: "1", name: "Artes" },
  { id: "2", name: "Biologia" },
  { id: "3", name: "Ciências" },
  { id: "4", name: "Educação física" },
  { id: "5", name: "Física" },
  { id: "6", name: "Geografia" },
  { id: "7", name: "História" },
  { id: "8", name: "Matemática" },
  { id: "9", name: "Português" },
  { id: "10", name: "Química" },
];

const weekdays = [
  { id: "1", name: "Domingo" },
  { id: "2", name: "Segunda-feira" },
  { id: "3", name: "Terça-feira" },
  { id: "4", name: "Quarta-feira" },
  { id: "5", name: "Quinta-feira" },
  { id: "6", name: "Sexta-feira" },
  { id: "7", name: "Sábado" },
];

function getSubject(subjectId) {
  return subjects.find((element) => element.id === subjectId).name;
}

function convertHoursToMinutes(time) {
  const [hour, minutes] = time.split(":");
  return Number(hour) * 60 + Number(minutes);
}

module.exports = { subjects, weekdays, getSubject, convertHoursToMinutes };
