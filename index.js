function calculateTeamFinanceReport(salaries, team) {
  const getCosts = (specialization) => {
    if (salaries[specialization]) {
      return (
        (salaries[specialization].salary * 100) /
        (100 -
          Number.parseInt(salaries[specialization].tax))
      );
    } else {
      return 0;
    }
  };

  let reportForTeams = {};

  team.map(({ specialization }) => {
    if (!reportForTeams[`totalBudget${specialization}`]) {
      reportForTeams[`totalBudget${specialization}`] =
        getCosts(specialization);
    } else {
      reportForTeams[`totalBudget${specialization}`] +=
        getCosts(specialization);
    }
  });

  let financeReport = {};

  for (const key in reportForTeams) {
    financeReport = {
      ...financeReport,
      [key]: Math.floor(reportForTeams[key]),
    };
  }

  // const totalBudgetTeam = Object.values(
  //   financeReport
  // ).reduce((acc, num) => {
  //   return acc + num;
  // }, 0);

  // return {
  //   totalBudgetTeam,
  //   ...financeReport,
  // };

  const totalBudgetTeam = Object.values(
    reportForTeams
  ).reduce((acc, num) => {
    return acc + num;
  }, 0);

  return {
    totalBudgetTeam: Math.floor(totalBudgetTeam),
    ...financeReport,
  };
}

const salaries1 = {
  Manager: { salary: 1000, tax: "10%" },
  Designer: { salary: 600, tax: "30%" },
  Artist: { salary: 1500, tax: "15%" },
};
const team1 = [
  { name: "Misha", specialization: "Manager" },
  { name: "Max", specialization: "Designer" },
  { name: "Vova", specialization: "Designer" },
  { name: "Leo", specialization: "Artist" },
];
const financeReport1 = calculateTeamFinanceReport(
  salaries1,
  team1
);
console.log(JSON.stringify(financeReport1));
/* see in console
{
"totalBudgetTeam":4590, // total budget does not match the sum of specializations due
to truncation of the fractional part
"totalBudgetManager":1111,
"totalBudgetDesigner":1714,
"totalBudgetArtist":1764,
}
*/

const salaries2 = {
  TeamLead: { salary: 1000, tax: "99%" },
  Architect: { salary: 9000, tax: "34%" },
};
const team2 = [
  { name: "Alexander", specialization: "TeamLead" },
  { name: "Gaudi", specialization: "Architect" },
  { name: "Koolhas", specialization: "Architect" },
  { name: "Foster", specialization: "Architect" },
  { name: "Napoleon", specialization: "General" },
];
const financeReport2 = calculateTeamFinanceReport(
  salaries2,
  team2
);
console.log(JSON.stringify(financeReport2));

/* see in console
{"totalBudgetTeam":140909,"totalBudgetTeamLead":100000,"totalBudgetArchitect":40909}
*/
