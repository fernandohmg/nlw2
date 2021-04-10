const Database = require("./database/db");
const {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMinutes,
} = require("./utils/format");

const pageLanding = (req, res) => {
  return res.render("index.html");
};

const pageStudy = async (req, res) => {
  const filters = req.query;

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render("study.html", { filters, subjects, weekdays });
  }
  const timeToMinutes = convertHoursToMinutes(filters.time);

  const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to >= ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}'
  `;

  try {
    const db = await Database;
    const proffys = await db.all(query);

    proffys.forEach((proffy) => {
      proffy.subject = getSubject(proffy.subject);
    });

    return res.render("study.html", { filters, subjects, weekdays, proffys });
  } catch (error) {
    console.log(error);
  }
};

const pageGiveClasses = (req, res) => {
  return res.render("give-classes.html", { subjects, weekdays });
};

const saveClass = async (req, res) => {
  const reqBody = req.body;
  const createProffy = require("./database/createProffy");

  const proffyValue = {
    name: reqBody.name,
    avatar: reqBody.avatar,
    whatsapp: reqBody.whatsapp,
    bio: reqBody.bio,
  };

  const classValue = {
    subject: reqBody.subject,
    cost: reqBody.cost,
  };

  const classScheduleValues = reqBody.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertHoursToMinutes(reqBody.time_from[index]),
      time_to: convertHoursToMinutes(reqBody.time_to[index]),
    };
  });

  try {
    const db = await Database;
    await createProffy(db, { proffyValue, classValue, classScheduleValues });

    let queryString = "?subject=" + reqBody.subject;
    queryString += "&weekday=" + reqBody.weekday[0];
    queryString += "&time=" + reqBody.time_from[0];

    return res.redirect("/study" + queryString);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { pageLanding, pageStudy, pageGiveClasses, saveClass };
