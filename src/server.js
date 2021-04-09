const proffys = [
  {
    name: "Diego Fernandes",
    avatar:
      "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "48995543213",
    bio:
      "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
    subject: "Química",
    cost: "20",
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: "Batata Batista",
    avatar: "https://avatars.githubusercontent.com/u/23464743?v=4",
    whatsapp: "",
    bio:
      "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
    subject: "Geografia",
    cost: "40",
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  },
];

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

const pageLanding = (req, res) => {
  return res.render("index.html");
};

const pageStudy = (req, res) => {
  const filters = req.query;
  return res.render("study.html", { proffys, filters, subjects, weekdays });
};

const pageGiveClasses = (req, res) => {
  const data = req.query;
  if (Object.keys(data).length > 0) {
    data.subject = subjects.find((element) => element.id === data.subject).name;
    proffys.push(data);
    return res.redirect("/study");
  }
  return res.render("give-classes.html", { subjects, weekdays });
};

const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server
  .use(express.static("public"))
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .listen(5500);
